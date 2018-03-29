import React, { Component } from 'react'
import { Paper } from 'material-ui'
import { List, ListItem } from 'material-ui/List'
import Merge from 'material-ui/svg-icons/communication/call-merge'
import MergeRequest from 'material-ui/svg-icons/image/transform'
import Completed from 'material-ui/svg-icons/action/assignment-turned-in'
import Uncompleted from 'material-ui/svg-icons/action/assignment'
import SeeMore from 'material-ui/svg-icons/navigation/more-horiz'
import Divider from 'material-ui/Divider'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import Theme from '../../../style/theme'
import { getIssues } from '../../actions/project'
import { addGithubToken } from '../../actions/session'
import BasicSpinner from '../BasicSpinner'

const mapStateToProps = state => ({
  session: state.session,
  projectIssues: state.projectIssues
})

const mapDispatchToProps = {
  getIssues, addGithubToken
}

class ProjectIssues extends Component {
  static getIssueIcon(type) {
    switch (type) {
      case 'closed':
      case 'Completed':
        return (<Completed />)
      case 'open':
      case 'Uncompleted':
        return (<Uncompleted />)
      case 'Merged':
        return (<Merge />)
      case 'MergeRequest':
        return (<MergeRequest />)
      case 'SeeMore':
        return (<SeeMore />)
      default:
    }
  }

  static renderIssue(info) {
    let date = info.closed_at_date
    if (date === null) {
      date = info.created_at_date
    }
    let dateString
    if (!Number.isNaN(Date.parse(date))) {
      dateString = new Date(Date.parse(date)).toLocaleString()
    }

    return (
      <ListItem
        href={info.url}
        primaryText={info.title}
        secondaryText={dateString}
        leftIcon={ProjectIssues.getIssueIcon(info.state)}
      />
    )
  }

  async componentDidMount() {
    const {
      session,
      getIssues,
      // addGithubToken
    } = this.props

    const id = this.props.projectId

    // Use this to set your github Token for now
    // await addGithubToken(
    //   session.authToken,
    //   { githubToken: 'mytoken' }
    // )

    await getIssues(session.authToken, id, {
      projectId: id,
      state: 'all',
      limit: 5
    })
  }

  renderIssues() {
    const numDisplayed = 2
    let issues = _.values(this.props.projectIssues.all.byId)
    if (!this.props.projectIssues.fetchedIssues) {
      return (
        <BasicSpinner />
      )
    }

    const seeMoreItem = (
      <ListItem
        href={`https://github.com/${this.props.githubUrl}/issues`}
        primaryText="See more..."
        leftIcon={ProjectIssues.getIssueIcon('SeeMore')}
      />)

    const noIssues = (
      <ListItem
        href={`https://github.com/${this.props.githubUrl}/issues`}
        primaryText="No issues in this repository"
        secondaryText="Click here to create your first issue"
        leftIcon={ProjectIssues.getIssueIcon('SeeMore')}
      />)

    issues = issues.map(issue => ({
      ...issue,
      url: `https://github.com/${this.props.githubUrl}/issues/${issue.number}`
    }))

    let displayedIssues = issues.slice(0, numDisplayed)
    displayedIssues = displayedIssues.map(issue => ProjectIssues.renderIssue(issue))
    if (issues.length > numDisplayed) {
      displayedIssues.push(seeMoreItem)
    }
    if (displayedIssues.length === 0) {
      displayedIssues.push(noIssues)
    }
    return (
      <List>
        {displayedIssues}
      </List>
    )
  }

  render() {
    if (this.props.githubUrl === null) {
      return null
    }
    return (
      <div>
        <Paper style={Theme.projectDetails.header}>
          <div style={Theme.projectDetails.headerText}>Recent Github Activity</div>
          <Divider />
          {this.renderIssues()}
        </Paper>
      </div>
    )
  }
}

ProjectIssues.defaultProps = {
  githubUrl: null
}

ProjectIssues.propTypes = {
  projectIssues: PropTypes.object.isRequired,
  githubUrl: PropTypes.string,
  projectId: PropTypes.string.isRequired,
}

const ExportedProjectIssues = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectIssues)

export default ExportedProjectIssues
