import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardText, CardTitle } from 'material-ui'
import { PieChart, Pie, Tooltip } from 'recharts'
import _ from 'lodash'
import Theme from '../../../../style/theme'
import BasicSpinner from '../../misc/BasicSpinner'

const styles = {
  container: {
    width: '100%',
    margin: Theme.padding.tiny
  }
}

class GraphUrls extends React.Component {
  static processData(props) {
    const summaryData = {}

    _.values(props.data).forEach((request) => {
      const name = request.url
      if (name in summaryData) {
        summaryData[name].value += 1
      } else {
        summaryData[name] = {
          value: 1, name
        }
      }
    })
    return { summaryData, computed: true }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.initialComputationRequired || prevState.data !== nextProps.data) {
      const newState = GraphUrls.processData(nextProps)
      return {
        data: nextProps.data,
        initialComputationRequired: false,
        ...newState
      }
    }
    return null
  }

  constructor(props) {
    super(props)
    this.state = {
      data: props.data, // eslint-disable-line react/no-unused-state
      summaryData: {},
      computed: false,
      initialComputationRequired: true // eslint-disable-line react/no-unused-state
    }
  }

  renderContent() {
    const summaryData = _.values(this.state.summaryData)
    if (!this.state.computed) {
      return <BasicSpinner />
    }
    const width = Math.min(this.props.windowSize.width - 150, 250)
    const height = width
    return (
      <div>
        <PieChart width={width} height={height}>
          <Pie dataKey="value" isAnimationActive={false} data={summaryData} cx={100} cy={100} outerRadius={80} fill="#2e839d" label />
          <Tooltip />
        </PieChart>
      </div>
    )
  }

  render() {
    return (
      <Card style={styles.container}>
        <CardTitle title="URL Pie Chart" />
        <CardText>
          {this.renderContent()}
        </CardText>
      </Card>
    )
  }
}

GraphUrls.defaultProps = {
  data: null,
  windowSize: {
    height: 0,
    width: 0
  }
}

GraphUrls.propTypes = {
  data: PropTypes.object,
  windowSize: PropTypes.object
}

export default GraphUrls
