import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { getSession } from '../actions/session'

const mapStateToProps = state => ({
  session: state.session
})

const mapDispatchToProps = {
  getSession
}

@connect(mapStateToProps, mapDispatchToProps)
class App extends Component {

  constructor (props) {
    super(props)
  }

  async componentDidMount () {
    const { session, history, getSession } = this.props
    if (session.authToken === null) {
      history.push('/login')
    } else {
      const { error } = await getSession(session.authToken)
      if (error) {
        history.push('/login')
      }
    }
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