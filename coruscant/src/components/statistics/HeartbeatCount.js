import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Divider, Paper } from 'material-ui'

import Theme from '../../../style/theme'

class HeartbeatCount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      heartbeatCount: 0
    }
  }
  render() {
    return (
      <Paper style={Theme.projectDetails.header}>
        <div style={Theme.projectDetails.headerText}>Heartbeats</div>
        <Divider />

        <p>Total heartbeats received: {this.state.heartbeatCount}</p>
      </Paper>
    )
  }
}

HeartbeatCount.propTypes = {
  // accounts: PropTypes.array.isRequired,
  // onAddAccount: PropTypes.func.isRequired
}

export default HeartbeatCount
