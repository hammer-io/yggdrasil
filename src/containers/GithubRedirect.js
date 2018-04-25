import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { exchangeForGithubToken } from '../actions/session'
import BasicSpinner from '../components/misc/BasicSpinner'
import { loadState } from '../utils/localStorage'
import PageWrap from '../components/misc/PageWrap'
import Theme from '../../style/theme'

const styles = {
  container: {
    padding: Theme.padding.regular,
    minWidth: 'inherit',
    maxWidth: 'inherit',
    width: 'inherit'
  }
}

const mapStateToProps = state => ({
  session: state.session
})

const mapDispatchToProps = {
  exchangeForGithubToken
}

@connect(mapStateToProps, mapDispatchToProps)
class GithubRedirect extends Component {
  static parseString(queryString) {
    const query = {}
    const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&')
    for (let i = 0; i < pairs.length; i += 1) {
      const pair = pairs[i].split('=')
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '')
    }
    return query
  }

  constructor(props) {
    super(props)
    this.state = {
      message: [<p key="github-redirect-1">Storing credentials, redirecting shortly...</p>]
    }
  }
  async componentDidMount() {
    const query = GithubRedirect.parseString(this.props.location.search)
    this.postToGithub(query)
  }

  async postToGithub(query) {
    const myState = loadState()

    if (myState.githubState !== query.state) {
      this.setState({
        message: this.state.message.concat(<p key="github-redirect-2">Improper redirect state. Process terminated.</p>)
      })
      return
    }

    const {
      exchangeForGithubToken,
      session
    } = this.props
    this.setState({
      message: this.state.message.concat(<p key="github-redirect-3">Connecting account to Github...</p>)
    })
    const { error } = await exchangeForGithubToken(
      session.authToken,
      query.code,
      query.state
    )

    if (error) {
      this.setState({ message: this.state.message.concat(<p key="github-redirect-4">An error has occurred.</p>) })
    } else {
      this.setState({ message: false })
    }
  }

  render() {
    if (this.state.message) {
      return (
        <div>
          <PageWrap>
            <div style={styles.container}>
              {this.state.message}
            </div>
          </PageWrap>
          <BasicSpinner />
        </div>
      )
    }
    return (
      <Redirect to="/settings/accounts" push />
    )
  }
}

GithubRedirect.propTypes = {
  location: PropTypes.object.isRequired,
}

export default withRouter(GithubRedirect)
