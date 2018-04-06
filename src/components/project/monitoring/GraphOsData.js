import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardText, CardTitle, Paper } from 'material-ui'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import _ from 'lodash'
import Theme from '../../../../style/theme'
import { convertBytesToString } from '../../../utils/stringFormatter'

const styles = {
  container: {
    width: '100%',
    margin: Theme.padding.tiny
  }
}

class GraphOsData extends React.PureComponent {
  static renderTooltip(info) {
    if (info.payload === null || info.payload.length < 1) {
      return null
    }
    return (
      <Paper style={{ padding: 10 }}>
        <p>{`${new Date(info.label).toLocaleString()}`}</p>
        <p>{`Total Memory : ${convertBytesToString(info.payload[0].payload.total)}`}</p>
        <p>{`Memory Used : ${convertBytesToString(info.payload[0].payload.used)} (${info.payload[0].payload.usedPercent.toFixed(2)}%)`}</p>
      </Paper>
    )
  }

  render() {
    const data = _.values(this.props.data).map(x => ({
      time: x.timestamp,
      total: x.totalMemory,
      used: x.memoryUsed * x.totalMemory,
      usedPercent: x.memoryUsed * 100,
      free: x.freeMemory
    }))

    const width = Math.min(this.props.windowSize.width - 200, 600)
    const height = width / 2

    return (
      <Card style={styles.container}>
        <CardTitle title="Recent Memory Usage" />
        <CardText>
          <LineChart
            width={width}
            height={height}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <XAxis ticks={['a']} dataKey="time" type="number" name="Timestamp" domain={['dataMin', 'dataMax']} />
            <YAxis dataKey="usedPercent" unit="%" />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip content={info => GraphOsData.renderTooltip(info)} />
            <Line type="monotone" dataKey="usedPercent" name="Memory Used" stroke={Theme.colors.primary} dot={false} />
          </LineChart>
        </CardText>
      </Card>
    )
  }
}

GraphOsData.defaultProps = {
  data: null,
  windowSize: {
    height: 0,
    width: 0
  }
}

GraphOsData.propTypes = {
  data: PropTypes.object,
  windowSize: PropTypes.object
}

export default GraphOsData
