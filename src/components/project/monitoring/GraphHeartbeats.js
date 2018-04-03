import React from 'react'
import { Card, CardText, CardTitle } from 'material-ui'
import PropTypes from 'prop-types'
import { BarChart, Bar, Cell } from 'recharts'
import _ from 'lodash'
import Theme from '../../../../style/theme'
import BasicSpinner from '../../misc/BasicSpinner'

const styles = {
  container: {
    width: '100%',
    margin: Theme.padding.tiny
  }
}

class GraphHeartbeats extends React.Component {
  static getColor(percent) {
    if (percent > 1) {
      return '#00E200'
    }
    if (percent === 0) {
      return Theme.colors.neutlight_d2
    }
    let r = Math.floor(((((1 - percent) / 0.5) * 228) + 228) / 2)
    let g = Math.floor((percent / 0.5) * 228)
    const b = 0
    if (percent > 0.5) {
      g = 228
    } else {
      r = 228
    }
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
  }

  static processData(props) {
    const numberOfDaysToView = 90

    const today = new Date()
    const startToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0)
    const summaryData = []

    for (let i = 0; i < numberOfDaysToView; i += 1) {
      const day = new Date(startToday.getTime() - (86400000 * i))
      const dateString = day.toLocaleDateString()
      summaryData[dateString] = {
        count: 0, dateString, interval: 1000, expected: 86400, height: 1
      }
    }

    _.values(props.data).forEach((heartbeat) => {
      const day = new Date(heartbeat.timestamp)
      const dateString = day.toLocaleDateString()
      if (dateString in summaryData) {
        const dayOfHeartbeat = summaryData[dateString]
        dayOfHeartbeat.count += 1
        if ('interval' in heartbeat) {
          dayOfHeartbeat.interval = heartbeat.interval
          dayOfHeartbeat.expected = 86400000 / heartbeat.interval
        }
      }
    })

    return { summaryData, computed: true }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.data !== nextProps.data) {
      const newState = GraphHeartbeats.processData(nextProps)
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
      activeIndex: 0,
      summaryData: [],
      computed: false
    }
  }

  handleClick(data, index) {
    this.setState({
      activeIndex: index
    })
  }

  renderContent() {
    const { activeIndex } = this.state
    const summaryData = _.values(this.state.summaryData)
    const activeItem = summaryData[activeIndex]
    if (!this.state.computed) {
      return <BasicSpinner />
    }
    return (
      <div>
        <div>Click a day to view more information</div>
        <div>
          <BarChart width={800} height={50} data={summaryData}>
            <Bar dataKey="height" onClick={(data, index) => this.handleClick(data, index)}>
              {
                summaryData.map((entry, index) => (
                  <Cell
                    cursor="pointer"
                    stroke={index === activeIndex ? '#000000' : ''}
                    strokeWidth={3}
                    fill={GraphHeartbeats.getColor(summaryData[index].count
                      / summaryData[index].expected)}
                  />
                ))
              }
            </Bar>
          </BarChart>
          <div style={{ verticalAlign: 'top' }}>{`${activeItem.dateString}`}</div>
          <div style={{ verticalAlign: 'top' }}>{`Interval: ${activeItem.interval}ms`}</div>
          <div style={{ verticalAlign: 'top' }}>{`Heartbeats: ${activeItem.count}`}</div>
          <div style={{ verticalAlign: 'top' }}>{`Expected: ${activeItem.expected}`}</div>
          <div style={{ verticalAlign: 'top' }}>{`Percentage: ${activeItem.count / activeItem.expected}`}</div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <Card style={styles.container}>
        <CardTitle title="Heartbeats" />
        <CardText>
          {this.renderContent()}
        </CardText>
      </Card>
    )
  }
}

GraphHeartbeats.defaultProps = {
  data: null
}

GraphHeartbeats.propTypes = {
  data: PropTypes.object,
}

export default GraphHeartbeats
