import React from 'react'
import PropTypes from 'prop-types'
import { Paper } from 'material-ui'
import Divider from 'material-ui/Divider'
import { PieChart, Pie, Tooltip } from 'recharts'
import _ from 'lodash'
import Theme from '../../../../style/theme'
import BasicSpinner from '../../misc/BasicSpinner'

class GraphUrls extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      summaryData: {},
      computed: false
    }
  }

  componentDidMount() {
    this.processData()
  }

  processData() {
    const { summaryData } = this.state

    _.values(this.props.data).forEach((request) => {
      const name = request.url
      if (name in summaryData) {
        summaryData[name].value += 1
      } else {
        summaryData[name] = {
          value: 1, name
        }
      }
    })
    this.setState({ summaryData, computed: true })
  }

  renderContent() {
    const summaryData = _.values(this.state.summaryData)
    if (!this.state.computed) {
      return <BasicSpinner />
    }
    return (
      <div>
        <PieChart width={200} height={200}>
          <Pie dataKey="value" isAnimationActive={false} data={summaryData} cx={100} cy={100} outerRadius={80} fill="#2e839d" label />
          <Tooltip />
        </PieChart>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Paper style={Theme.projectDetails.header}>
          <div style={Theme.projectDetails.headerText}>Url Pie Chart</div>
          <Divider />
          {this.renderContent()}
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
