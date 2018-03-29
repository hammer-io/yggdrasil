import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardText, CardTitle } from 'material-ui'
import { PieChart, Pie, Tooltip } from 'recharts'
import _ from 'lodash'
import Theme from '../../../../style/theme'
import BasicSpinner from '../../misc/BasicSpinner'

const styles = {
  container: {
    width: '100%',
    margin: Theme.padding.tiny
  }
}

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
      <Card style={styles.container}>
        <CardTitle title="URL Pie Chart" />
        <CardText>
          {this.renderContent()}
        </CardText>
      </Card>
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
