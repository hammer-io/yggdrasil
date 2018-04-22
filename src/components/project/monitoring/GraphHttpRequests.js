import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardText, CardTitle, Paper } from 'material-ui'
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Legend } from 'recharts'
import _ from 'lodash'
import Theme from '../../../../style/theme'

const styles = {
  container: {
    width: '100%',
    margin: Theme.padding.tiny
  }
}

class GraphHttpRequests extends React.PureComponent {
  static renderTooltip(info) {
    if (info.payload.length < 3) {
      return null
    }
    return (
      <Paper style={{ padding: 10 }}>
        <div style={{ verticalAlign: 'top' }}>{`Timestamp : ${new Date(info.payload[0].payload.timestamp).toLocaleString()}`}</div>
        <div style={{ verticalAlign: 'top' }}>{`Response Time : ${info.payload[0].payload.responseTime}ms`}</div>
        <div style={{ verticalAlign: 'top' }}>{`Request Size : ${info.payload[0].payload.requestSize}`}</div>
        <div style={{ verticalAlign: 'top' }}>{`url : '${info.payload[0].payload.url}'`}</div>
        <div style={{ verticalAlign: 'top' }}>{`Status : ${info.payload[0].payload.status}`}</div>
        <div style={{ verticalAlign: 'top' }}>{`Method : ${info.payload[0].payload.method}`}</div>
      </Paper>
    )
  }

  render() {
    const green = []
    const yellow = []
    const red = []

    _.values(this.props.data).forEach((x) => {
      if (x.status >= 200 && x.status < 400) {
        green.push(x)
      } else if (x.status >= 400 && x.status < 500) {
        yellow.push(x)
      } else if (x.status >= 500) {
        red.push(x)
      }
    })
    const width = Math.min(this.props.windowSize.width - 150, 400)
    const height = width

    return (
      <Card style={styles.container}>
        <CardTitle title="Recent Http Requests" />
        <CardText>
          <ScatterChart
            width={width}
            height={height}
            margin={{
                top: 20, right: 20, bottom: 20, left: 20
              }}
          >
            <XAxis ticks={['a']} dataKey="timestamp" type="number" name="Timestamp" domain={['dataMin', 'dataMax']} />
            <YAxis dataKey="responseTime" type="number" name="responseTime" unit="ms" label={{ value: 'Response Time', angle: -90, position: 'insideLeft' }} />
            <ZAxis dataKey="requestSize" range={[60, 400]} name="requestSize" />
            <Scatter name="2xx,3xx" data={green} fill={Theme.colors.green500} />
            <Scatter name="4xx" data={yellow} fill={Theme.colors.yellow500} />
            <Scatter name="5xx" data={red} fill={Theme.colors.red500} />
            <Legend />
            <Tooltip content={info => GraphHttpRequests.renderTooltip(info)} />
          </ScatterChart>
        </CardText>
      </Card>
    )
  }
}

GraphHttpRequests.defaultProps = {
  data: null,
  windowSize: {
    height: 0,
    width: 0
  }
}

GraphHttpRequests.propTypes = {
  data: PropTypes.object,
  windowSize: PropTypes.object
}

export default GraphHttpRequests
