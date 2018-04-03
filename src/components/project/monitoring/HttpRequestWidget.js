import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardText, CardTitle } from 'material-ui'
import _ from 'lodash'
import Theme from '../../../../style/theme'

const styles = {
  container: {
    width: '100%',
    margin: Theme.padding.tiny
  }
}

class HttpRequestWidget extends React.PureComponent {
  static processData(props) {
    let badRequests = 0
    let numberOfRequests = 0
    let totalResponseTime = 0
    let maxResponseTime = 0

    const yesterday = new Date().getTime() - 86400000

    _.values(props.data).forEach((request) => {
      if (request.timestamp > yesterday) {
        badRequests += (request.status >= 400) ? 1 : 0
        numberOfRequests += 1
        totalResponseTime += request.responseTime
        if (request.responseTime > maxResponseTime) {
          maxResponseTime = request.responseTime
        }
      }
    })

    return {
      badRequests, numberOfRequests, totalResponseTime, maxResponseTime
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.data !== nextProps.data) {
      const newState = HttpRequestWidget.processData(nextProps)
      return {
        data: nextProps.data,
        ...newState
      }
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      data: props.data, // eslint-disable-line react/no-unused-state
      badRequests: 0,
      numberOfRequests: 0,
      totalResponseTime: 0,
      maxResponseTime: 0
    }
  }

  renderInformation() {
    if (this.state.numberOfRequests === 0) {
      return (
        <div>
          <p>No recent requests</p>
        </div>
      )
    }
    return (
      <div>
        <p>{`Number of Bad Requests : ${this.state.badRequests}`}</p>
        <p>{`Average Response Time : ${this.state.totalResponseTime / this.state.numberOfRequests}ms`}</p>
        <p>{`Longest Response Time : ${this.state.maxResponseTime}ms`}</p>
      </div>
    )
  }

  render() {
    return (
      <Card style={styles.container}>
        <CardTitle title="Recent Day HTTP Request Info" />
        <CardText>
          {this.renderInformation()}
        </CardText>
      </Card>
    )
  }
}

HttpRequestWidget.defaultProps = {
  data: null
}

HttpRequestWidget.propTypes = {
  data: PropTypes.object,
}

export default HttpRequestWidget
