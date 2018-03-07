import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Divider, Paper } from 'material-ui'

import { database } from '../../utils/firebase'
import Theme from '../../../style/theme'

class HeartbeatCount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      heartbeatCount: '...',
      lastHeartbeat: '...'
    }
  }
  componentWillMount() {
    try {
      // Get the last heartbeat
      database.ref(`/heartbeats/${this.props.projectId}`).limitToLast(1).once('value').then((snapshot) => {
        let lastHeartbeat = 'N/A'
        snapshot.forEach((heartbeat) => {
          const date = new Date(heartbeat.val().timestamp)
          lastHeartbeat = date.toLocaleString()
        })
        this.setState({ lastHeartbeat })
      })

      // Count the total number of heartbeats
      database.ref(`/heartbeats/${this.props.projectId}`).once('value').then((snapshot) => {
        let heartbeatCount = snapshot.numChildren()
        if (heartbeatCount === 0) {
          heartbeatCount = 'N/A'
        }
        this.setState({ heartbeatCount })
      })
    } catch (err) {
      this.setState({
        heartbeatCount: 'N/A',
        lastHeartbeat: 'N/A'
      })
      console.error(err)
    }
  }
  render() {
    return (
      <Paper style={Theme.projectDetails.header}>
        <div style={Theme.projectDetails.headerText}>Heartbeats</div>
        <Divider />

        <p>Total received: {this.state.heartbeatCount}</p>
        <p>Last received: {this.state.lastHeartbeat}</p>
      </Paper>
    )
  }
}

HeartbeatCount.propTypes = {
  projectId: PropTypes.string.isRequired
}

export default HeartbeatCount
