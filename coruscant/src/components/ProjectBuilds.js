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
import { getBuildStatuses, addTravisToken } from '../actions/project'
import Spinner from './../components/Spinner'

const mapStateToProps = state => ({
  session: state.session,
  projects: state.projects
})

const mapDispatchToProps = {
  getBuildStatuses, addTravisToken
}

@connect(mapStateToProps, mapDispatchToProps)
class ProjectIssues extends Component {
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
        leftIcon={ProjectIssues.getIssueIcon(info.state)}
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
    // This token is for the travis repo: NathanDeGraafTest/naaathan9
    // await addTravisToken(session.authToken, { travisToken: 'JZiyq_IlvMGkuj3bx24ASw' })
    await getBuildStatuses(session.authToken, id, 5)
  }

  renderBuildStatuses() {
    const numDisplayed = 2
    let statuses = _.values(this.props.projects.buildStatuses.byId)
    if (!this.props.projects.fetchedBuildStatuses) {
      return (
        <div style={Theme.spinnerContainer}>
          <Spinner />
        </div>
      )
    }

    const seeMoreItem = (
      <ListItem
        href={`https://travis-ci.org/${this.props.travisUrl}/builds`}
        primaryText="See more..."
        leftIcon={ProjectIssues.getIssueIcon('SeeMore')}
      />)

    statuses = statuses.reverse()
    statuses = statuses.map(issue => ({
      ...issue,
      url: `https://travis-ci.org/${this.props.travisUrl}/builds/${issue.id}`
    }))

    let displayedStatuses = statuses.slice(0, numDisplayed)
    displayedStatuses = displayedStatuses.map(status => ProjectIssues.renderBuildStatus(status))

    if (statuses.length > numDisplayed) {
      displayedStatuses.push(seeMoreItem)
    }
    return (
      <List>
        {displayedStatuses}
      </List>
    )
  }

  render() {
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

ProjectIssues.propTypes = {
  projects: PropTypes.object.isRequired,
  travisUrl: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired,
}


export default ProjectIssues
