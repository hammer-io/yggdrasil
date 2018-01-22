import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import theme from "../../style/theme.js"

import Navbar from './../components/Navbar'
import Sidebar from './../components/Sidebar'

const mapStateToProps = state => ({
  session: state.session
})

@connect(mapStateToProps)
class App extends Component {

  constructor (props) {
    super(props)
  }

  componentDidMount () {
    const { session, history } = this.props
    if (session.authToken === null) {
      history.replace('/login')
    }

  }

  componentDidUpdate(prevProps) {
    // const { dispatch, redirectUrl } = this.props
    // const isLoggingOut = prevProps.isLoggedIn && !this.props.isLoggedIn
    // const isLoggingIn = !prevProps.isLoggedIn && this.props.isLoggedIn
    //
    // if (isLoggingIn) {
    //   dispatch(navigateTo(redirectUrl))
    // } else if (isLoggingOut) {
    //   // do any kind of cleanup or post-logout redirection here
    // }
  }

  async validateToken (authToken) {

  }

  render () {
    return (
      <div>
        {
          this.props.children
        }
      </div>
    )
  }
}

export default withRouter(App)