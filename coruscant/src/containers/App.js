import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { getSession } from '../actions/session'

const mapStateToProps = state => ({
  session: state.session
})

const mapDispatchToProps = {
  getSession
}

@connect(mapStateToProps, mapDispatchToProps)
class App extends Component {
  async componentDidMount() {
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
