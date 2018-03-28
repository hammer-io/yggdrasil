import React from 'react'
import PropTypes from 'prop-types'
import { Paper } from 'material-ui'
import Divider from 'material-ui/Divider'
import _ from 'lodash'
import Theme from '../../style/theme'

class HttpRequestWidget extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      badRequests: 0,
      numberOfRequests: 0,
      totalResponseTime: 0,
      maxResponseTime: 0
    }
  }

  componentDidMount() {
    this.processData()
  }

  processData() {
    let badRequests = 0
    let numberOfRequests = 0
    let totalResponseTime = 0
    let maxResponseTime = 0

    const yesterday = new Date().getTime() - 86400000

    _.values(this.props.data).forEach((request) => {
      if (request.timestamp > yesterday) {
        badRequests += (request.status >= 400) ? 1 : 0
        numberOfRequests += 1
        totalResponseTime += request.responseTime
        if (request.responseTime > maxResponseTime) {
          maxResponseTime = request.responseTime
        }
      }
    })

    this.setState({
      badRequests, numberOfRequests, totalResponseTime, maxResponseTime
    })
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
      <div>
        <Paper style={Theme.projectDetails.header}>
          <div style={Theme.projectDetails.headerText}>Recent Day Http Request Info</div>
          <Divider />
          {this.renderInformation()}
        </Paper>
      </div>
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
