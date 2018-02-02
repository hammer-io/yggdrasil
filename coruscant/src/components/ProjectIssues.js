import React, { Component } from 'react'
import { Paper } from 'material-ui'
import { List, ListItem } from 'material-ui/List'
import Merge from 'material-ui/svg-icons/communication/call-merge'
import MergeRequest from 'material-ui/svg-icons/image/transform'
import Completed from 'material-ui/svg-icons/alert/error'
import Uncompleted from 'material-ui/svg-icons/alert/error-outline'
import SeeMore from 'material-ui/svg-icons/navigation/more-horiz'
import Divider from 'material-ui/Divider'
import PropTypes from 'prop-types'
import Theme from '../../style/theme'

class ProjectIssues extends Component {
  static getIssueIcon(type) {
    switch (type) {
      case 'Completed':
        return (<Completed />)
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
    return (
      <ListItem
        href={info.url}
        primaryText={info.name}
        secondaryText={info.date}
        leftIcon={ProjectIssues.getIssueIcon(info.type)}
      />
    )
  }

  renderIssues() {
    const seeMoreItem = {
      name: 'See more...',
      type: 'SeeMore',
      url: this.props.moreIssues
    }

    let issues = this.props.issues.slice(0, 4)
    if (this.props.issues.length > 4) {
      issues.push(seeMoreItem)
    }
    issues = issues.map(issue => ProjectIssues.renderIssue(issue))
    return issues
  }

  render() {
    return (
      <div>
        <Paper style={Theme.projectDetails.header}>
          <div style={Theme.projectDetails.headerText}>Recent Github Activity</div>
          <Divider />
          <List>
            {this.renderIssues()}
          </List>
        </Paper>
      </div>
    )
  }
}

ProjectIssues.propTypes = {
  issues: PropTypes.array.isRequired,
  moreIssues: PropTypes.string.isRequired
}


export default ProjectIssues
