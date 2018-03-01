import React, { Component } from 'react'
import { Paper } from 'material-ui'
import { List, ListItem } from 'material-ui/List'
import Done from 'material-ui/svg-icons/action/done'
import EmptyHourglass from 'material-ui/svg-icons/action/hourglass-empty'
import FullHourglass from 'material-ui/svg-icons/action/hourglass-full'
import Canceled from 'material-ui/svg-icons/content/block'
import Failed from 'material-ui/svg-icons/content/clear'
import Uncompleted from 'material-ui/svg-icons/alert/error-outline'
import SeeMore from 'material-ui/svg-icons/navigation/more-horiz'
import Divider from 'material-ui/Divider'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import Theme from '../../style/theme'
import { getBuildStatuses } from '../actions/project'
import { addTravisToken } from '../actions/session'
import BasicSpinner from '../components/BasicSpinner'

const mapStateToProps = state => ({
  session: state.session,
  projectBuilds: state.projectBuilds
})

const mapDispatchToProps = {
  getBuildStatuses, addTravisToken
}

class ProjectBuilds extends Component {
  static getIssueIcon(type) {
    switch (type) {
      case 'passed':
        return (<Done />)
      case 'started':
        return (<FullHourglass />)
      case 'created':
        return (<EmptyHourglass />)
      case 'canceled':
        return (<Canceled />)
      case 'SeeMore':
        return (<SeeMore />)
      case 'failed':
        return (<Failed />)
      default:
        return (<Uncompleted />)
    }
  }

  static renderBuildStatus(info) {
    const startTime = Date.parse(info.started_at)
    const endTime = Date.parse(info.finished_at)

    let timeString = ''
    if (!Number.isNaN(startTime)) {
      timeString = `Started: ${new Date(startTime).toLocaleString()}`
    }
    if (!Number.isNaN(endTime)) {
      timeString = `Finished: ${new Date(endTime).toLocaleString()}`
    }

    let durationString = 'Duration: -'
    if (info.duration > 0) {
      durationString = `Duration: ${info.duration} sec`
    }

    const title = `Build #${info.buildNumber} ${info.state}`
    return (
      <ListItem
        href={info.url}
        primaryText={title}
        secondaryText={
          <div>
            <div>
              {durationString}
            </div>
            <div>
              {timeString}
            </div>
          </div>
        }
        secondaryTextLines={2}
        leftIcon={ProjectBuilds.getIssueIcon(info.state)}
      />
    )
  }

  async componentDidMount() {
    const {
      session,
      getBuildStatuses,
      // addTravisToken
    } = this.props

    const id = this.props.projectId
    // Use this to set your travis token for now
    // await addTravisToken(session.authToken, { travisToken: '' })
    await getBuildStatuses(session.authToken, id, 5)
  }

  renderBuildStatuses() {
    const numDisplayed = 2
    let statuses = _.values(this.props.projectBuilds.all.byId)
    if (!this.props.projectBuilds.fetchedBuildStatuses) {
      return (
        <BasicSpinner />
      )
    }

    const seeMoreItem = (
      <ListItem
        href={`https://travis-ci.org/${this.props.travisUrl}/builds`}
        primaryText="See more..."
        leftIcon={ProjectBuilds.getIssueIcon('SeeMore')}
      />)

    const noBuilds = (
      <ListItem
        href={`https://travis-ci.org/${this.props.travisUrl}/builds`}
        primaryText="No builds for this repository"
        leftIcon={ProjectBuilds.getIssueIcon('SeeMore')}
      />)

    statuses = statuses.reverse()
    statuses = statuses.map(issue => ({
      ...issue,
      url: `https://travis-ci.org/${this.props.travisUrl}/builds/${issue.id}`
    }))

    let displayedStatuses = statuses.slice(0, numDisplayed)
    displayedStatuses = displayedStatuses.map(status => ProjectBuilds.renderBuildStatus(status))

    if (statuses.length > numDisplayed) {
      displayedStatuses.push(seeMoreItem)
    }
    if (displayedStatuses.length === 0) {
      displayedStatuses.push(noBuilds)
    }
    return (
      <List>
        {displayedStatuses}
      </List>
    )
  }

  render() {
    if (this.props.travisUrl === null) {
      return null
    }
    return (
      <div>
        <Paper style={Theme.projectDetails.header}>
          <div style={Theme.projectDetails.headerText}>Recent Travis Builds</div>
          <Divider />
          {this.renderBuildStatuses()}
        </Paper>
      </div>
    )
  }
}

ProjectBuilds.defaultProps = {
  travisUrl: null
}

ProjectBuilds.propTypes = {
  projectBuilds: PropTypes.object.isRequired,
  travisUrl: PropTypes.string,
  projectId: PropTypes.string.isRequired,
}

const ExportedProjectBuilds = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectBuilds)

export default ExportedProjectBuilds
