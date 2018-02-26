import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { exchangeForHerokuToken } from '../actions/session'
import BasicSpinner from '../components/BasicSpinner'
import { loadState } from '../utils/localStorage'

const mapStateToProps = state => ({
  session: state.session
})

const mapDispatchToProps = {
  exchangeForHerokuToken
}

@connect(mapStateToProps, mapDispatchToProps)
class HerokuRedirect extends Component {
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
      message: [<div>Storing credentials, redirecting shortly...</div>]
    }
  }

  async componentDidMount() {
    const query = HerokuRedirect.parseString(this.props.location.search)
    this.postToHeroku(query)
  }

  async postToHeroku(query) {
    const myState = loadState()

    if (myState.herokuState !== query.state) {
      this.setState({
        message: this.state.message.concat(<div>Improper redirect state. Process terminated.</div>)
      })
      return
    }

    this.setState({
      message: this.state.message.concat(<div>Connecting account to Heroku...</div>)
    })
    const {
      exchangeForHerokuToken,
      session
    } = this.props
    const { error } = await exchangeForHerokuToken(session.authToken, query.code)

    if (error) {
      this.setState({ message: this.state.message.concat(<div>An error has occurred.</div>) })
    } else {
      this.setState({ message: false })
    }
  }

  render() {
    if (this.state.message) {
      return (
        <div>
          {this.state.message}
          <BasicSpinner />
        </div>
      )
    }
    return (
      <Redirect to="/settings/accounts" />
    )
  }
}

HerokuRedirect.propTypes = {
  location: PropTypes.object.isRequired,
}

export default withRouter(HerokuRedirect)
