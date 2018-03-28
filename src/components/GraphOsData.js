import React from 'react'
import PropTypes from 'prop-types'
import { Paper } from 'material-ui'
import Divider from 'material-ui/Divider'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import _ from 'lodash'
import Theme from '../../style/theme'


class GraphOsData extends React.PureComponent {
  static renderTooltip(info) {
    if (info.payload.length < 2) {
      return null
    }
    return (
      <Paper style={{ padding: 10 }}>
        <p>{`${new Date(info.label).toLocaleString()}`}</p>
        <p>{`Total Memory : ${info.payload[0].payload.total}`}</p>
        <p>{`Memory Used : ${info.payload[0].payload.used}`}</p>
      </Paper>
    )
  }

  render() {
    const data = _.values(this.props.data).map(x => ({
      time: x.timestamp,
      total: x.totalMemory,
      used: x.memoryUsed * x.totalMemory,
      free: x.freeMemory
    }))


    return (
      <div>
        <Paper style={Theme.projectDetails.header}>
          <div style={Theme.projectDetails.headerText}>Recent Memory Usage</div>
          <Divider />
          <LineChart
            width={600}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <XAxis ticks={['a']} dataKey="time" type="number" name="Timestamp" domain={['dataMin', 'dataMax']} />
            <YAxis hide />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip content={info => GraphOsData.renderTooltip(info)} />
            <Legend />
            <Line type="monotone" dataKey="used" name="Memory Used" stroke="#8884d8" dot={false} />
            <Line type="monotone" dataKey="total" name="Total Memory" stroke="#ff0000" dot={false} />
          </LineChart>
        </Paper>
      </div>
    )
  }
}

GraphOsData.defaultProps = {
  data: null
}

GraphOsData.propTypes = {
  data: PropTypes.object,
}

export default GraphOsData
