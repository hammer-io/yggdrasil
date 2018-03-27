import React from 'react'
import PropTypes from 'prop-types'
import { Paper } from 'material-ui'
import Divider from 'material-ui/Divider'
import { PieChart, Pie, Tooltip } from 'recharts'
import Theme from '../../style/theme'

class GraphUrls extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      summaryData: {}
    }
    this.processData()
  }

  processData() {
    const { summaryData } = this.state

    Object.values(this.props.data).forEach((request) => {
      const name = request.url
      if (name in summaryData) {
        summaryData[name].value += 1
      } else {
        summaryData[name] = {
          value: 1, name
        }
      }
    })
    this.setState({ summaryData })
  }

  render() {
    const summaryData = Object.values(this.state.summaryData)
    return (
      <div>
        <Paper style={Theme.projectDetails.header}>
          <div style={Theme.projectDetails.headerText}>Url Pie Chart</div>
          <Divider />
          <PieChart width={200} height={200}>
            <Pie dataKey="value" isAnimationActive={false} data={summaryData} cx={100} cy={100} outerRadius={80} fill="#2e839d" label />
            <Tooltip />
          </PieChart>
        </Paper>
      </div>
    )
  }
}

GraphUrls.defaultProps = {
  data: null
}

GraphUrls.propTypes = {
  data: PropTypes.object,
}

export default GraphUrls
