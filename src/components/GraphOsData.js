import React from 'react'
import PropTypes from 'prop-types'
import { Paper } from 'material-ui'
import Divider from 'material-ui/Divider'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import Theme from '../../style/theme'

class GraphOsData extends React.PureComponent {
  static renderItem(url, text, display) {
    if (display) {
      return (
        <ListItem
          href={url}
          primaryText={text}
        />
      )
    }
  }

  // "freeMemory" : 209506304,
  // "memoryUsed" : 0.01219487190246582,
  // "timestamp" : 1520445282601,
  // "totalMemory" : 17179869184
  render() {

    console.log('aardvark')
    console.log(this.props.data)

    const data = Object.values(this.props.data).map(x => {
      return {
        time: x.timestamp,
        total: x.totalMemory/1000,
        used: x.memoryUsed/1000,
        free: x.freeMemory/1000
      }
    })


    return (
      <div>
        <Paper style={Theme.projectDetails.header}>
          <div style={Theme.projectDetails.headerText}>Timeline of Memory Usage</div>
          <Divider />
          <LineChart width={600} height={300} data={data}
                     margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey="time" type="number" name='Timestamp' domain={['dataMin','dataMax']}/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend />
            <Line type="monotone" dataKey="used" name="Memory Used" stroke="#8884d8" activeDot={{r: 8}}/>
            <Line type="monotone" dataKey="free" name="Memory Free" stroke="#82ca9d" />
            <Line type="monotone" dataKey="total" name="Total Memory" stroke="#ff0000" />
          </LineChart>
        </Paper>
      </div>
    )
  }
}

GraphOsData.defaultProps = {
  githubUrl: null,
  travisUrl: null,
  herokuUrl: null
}

GraphOsData.propTypes = {
  data: PropTypes.object,
}

export default GraphOsData
