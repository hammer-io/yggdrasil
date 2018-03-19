import React from 'react'
import PropTypes from 'prop-types'
import { Paper } from 'material-ui'
import Divider from 'material-ui/Divider'
import { List, ListItem } from 'material-ui/List'
import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import Theme from '../../style/theme'

class GraphHeartbeats extends React.PureComponent {
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

  render() {

    console.log('aardvark')
    console.log(this.props.data)

    const data = [{x: 100, y: 200, z: 200}, {x: 120, y: 100, z: 260},
      {x: 170, y: 300, z: 400}, {x: 140, y: 250, z: 280},
      {x: 150, y: 400, z: 500}, {x: 110, y: 280, z: 200}]

    const response = Object.values(this.props.data).map(x => {
      if(x.type!=="response") {
        return {}
      }
      return {
        x: x.timestamp,
        size: 1,
      }
    })

    const request = Object.values(this.props.data).map(x => {
      if(x.type!=="request") {
        return {}
      }
      return {
        x: x.timestamp,
        size: x.size,
      }
    })

    return (
      <div>
        <Paper style={Theme.projectDetails.header}>
          <div style={Theme.projectDetails.headerText}>Timeline of Http Requests</div>
          <Divider />
          <ScatterChart width={400} height={400} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
            <XAxis dataKey={'x'} type="number" name='Timestamp' domain={['dataMin','dataMax']}/>
            <YAxis dataKey={"size"} type="number" name='Size'/>
            <Scatter name='Response' data={response} fill='#ff0000'/>
            <Scatter name='Request' data={request} fill='#00ff00'/>
            <Legend />
            <Tooltip cursor={{strokeDasharray: '3 3'}}/>
          </ScatterChart>
        </Paper>
      </div>
    )
  }
}

GraphHeartbeats.defaultProps = {
  githubUrl: null,
  travisUrl: null,
  herokuUrl: null
}

GraphHeartbeats.propTypes = {
  data: PropTypes.object,
}

export default GraphHeartbeats
