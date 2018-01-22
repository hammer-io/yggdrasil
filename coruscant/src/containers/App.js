import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { getSession, setAccessToken } from '../actions/session'

const mapStateToProps = state => ({
  session: state.session
})

const mapDispatchToProps = {
  getSession,
  setAccessToken
}

@connect(mapStateToProps, mapDispatchToProps)
class App extends Component {
  async componentDidMount() {
    const {
      session,
      history,
      location,
      getSession
    } = this.props

    if (location.pathname === '/register') {
      return
    }

    if (session.authToken === null) {
      history.push('/login')
    } else {
      const { error } = await getSession(session.authToken)
      if (error) {
        setAccessToken(null)
        history.push('/login')
      }
    }
  }

  render() {
    return (
      <div>
        {
          this.props.children
        }
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired
}

export default withRouter(App)
