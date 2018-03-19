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

    const data = Object.values(this.props.data).map(x => {
      return {
        x: x.timestamp,
        y: 1,
      }
    })
    console.log(data)

    return (
      <div>
        <Paper style={Theme.projectDetails.header}>
          <div style={Theme.projectDetails.headerText}>Timeline of Heartbeats</div>
          <Divider />
          <ScatterChart width={400} height={400} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
            <XAxis dataKey={'x'} type="number" name='stature' domain={['dataMin','dataMax']}/>
            <YAxis dataKey={'y'} type="number" name='weight'/>
            <CartesianGrid />
            <Scatter name='A school' data={data} fill='#8884d8'/>
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
