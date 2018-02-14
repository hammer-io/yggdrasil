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
import Theme from '../../style/theme'
import { getIssues, addGithubToken } from '../actions/project'
import Spinner from './../components/Spinner'

const mapStateToProps = state => ({
  session: state.session,
  projects: state.projects
})

const mapDispatchToProps = {
  getIssues, addGithubToken
}

@connect(mapStateToProps, mapDispatchToProps)
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
    // This token is for the git repo: NathanDeGraafTest/asdf23
    // await addGithubToken(session.authToken,
    // {githubToken: 'abc005faf06264216e3aedf60389a7fc7d5fb83a'})

    await getIssues(session.authToken, id, {
      projectId: id,
      state: 'all',
      limit: 5
    })
  }

  renderIssues() {
    const numDisplayed = 2
    let issues = _.values(this.props.projects.issues.byId)
    if (!this.props.projects.fetchedIssues) {
      return (
        <div style={Theme.spinnerContainer}>
          <Spinner />
        </div>
      )
    }

    const seeMoreItem = {
      title: 'See more...',
      state: 'SeeMore',
      url: `https://github.com/${this.props.githubUrl}/issues`
    }

    issues = issues.map(issue => ({
      ...issue,
      url: `https://github.com/${this.props.githubUrl}/issues/${issue.number}`
    }))

    const displayedIssues = issues.slice(0, numDisplayed)
    if (issues.length > numDisplayed) {
      displayedIssues.push(seeMoreItem)
    }
    issues = displayedIssues.map(issue => ProjectIssues.renderIssue(issue))
    return (
      <List>
        {issues}
      </List>
    )
  }

  render() {
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

ProjectIssues.propTypes = {
  projects: PropTypes.object.isRequired,
  githubUrl: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired,
}


export default ProjectIssues
