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
    const colors = [
      {
        min: 0.9999,
        color: Theme.colors.green500
      },
      {
        min: 0.99,
        color: Theme.colors.lightGreen500
      },
      {
        min: 0.95,
        color: Theme.colors.lime500
      },
      {
        min: 0.9,
        color: Theme.colors.yellow500
      },
      {
        min: 0.75,
        color: Theme.colors.amber500
      },
      {
        min: 0.5,
        color: Theme.colors.orange500
      },
      {
        min: 0.1,
        color: Theme.colors.deepOrange500
      },
      {
        min: 0.000001,
        color: Theme.colors.red500
      }
    ]
    let color = Theme.colors.neutlight_d2
    for (let i = 0; i < colors.length; i += 1) {
      if (percent > colors[i].min) {
        ({ color } = colors[i])
        break
      }
    }
    return color
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
    const width = Math.min(this.props.windowSize.width - 150, 800)
    const height = 50
    return (
      <div>
        <div>Click a day to view more information</div>
        <div>
          <BarChart width={width} height={height} data={summaryData}>
            <Bar dataKey="height" onClick={(data, index) => this.handleClick(data, index)}>
              {
                summaryData.map((entry, index) => (
                  <Cell
                    cursor="pointer"
                    stroke={index === activeIndex ? Theme.colors.black : ''}
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
          <div style={{ verticalAlign: 'top' }}>{`Percentage: ${((activeItem.count / activeItem.expected) * 100).toFixed(2)}%`}</div>
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
  data: null,
  windowSize: {
    height: 0,
    width: 0
  }
}

GraphHeartbeats.propTypes = {
  data: PropTypes.object,
  windowSize: PropTypes.object
}

export default GraphHeartbeats
