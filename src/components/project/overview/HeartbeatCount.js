import React, { Component } from 'react'
import Flexbox from 'flexbox-react'
import PropTypes from 'prop-types'
import { Card, CardText, CardTitle } from 'material-ui'
import * as firebase from 'firebase'

import Theme from '../../../../style/theme'

const styles = {
  container: {
    width: '100%',
    margin: Theme.padding.tiny
  }
}

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
      firebase.database()
        .ref(`/heartbeats/${this.props.projectId}`)
        .limitToLast(1)
        .once('value')
        .then((snapshot) => {
          let lastHeartbeat = 'N/A'
          snapshot.forEach((heartbeat) => {
            const date = new Date(heartbeat.val().timestamp)
            lastHeartbeat = date.toLocaleString()
          })
          this.setState({ lastHeartbeat })
        })

      // Count the total number of heartbeats
      firebase.database()
        .ref(`/heartbeats/${this.props.projectId}`)
        .once('value')
        .then((snapshot) => {
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
      <Flexbox>
        <Card style={styles.container}>
          <CardTitle title="Heartbeats" />
          <CardText>
            <p>Total received: {this.state.heartbeatCount}</p>
            <p>Last received: {this.state.lastHeartbeat}</p>
          </CardText>
        </Card>
      </Flexbox>
    )
  }
}

HeartbeatCount.propTypes = {
  projectId: PropTypes.string.isRequired
}

export default HeartbeatCount
