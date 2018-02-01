import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Theme from '../../style/theme'

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
    document.body.style.backgroundColor = Theme.palette.bodyBackground

    const {
      session,
      history,
      location,
      getSession,
      setAccessToken
    } = this.props

    let loggedIn = false
    if (session.authToken !== null) {
      const { result } = await getSession(session.authToken)
      if (result) {
        loggedIn = true
      } else {
        setAccessToken(null)
      }
    }

    if (loggedIn && (location.pathname === '/login' || location.pathname === '/register')) {
      history.replace('/home')
    } else if (!loggedIn && location.pathname !== '/login' && location.pathname !== '/register') {
      history.push('/login')
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
  children: PropTypes.node.isRequired,
  session: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  getSession: PropTypes.func.isRequired,
  setAccessToken: PropTypes.func.isRequired,
}

export default withRouter(App)
