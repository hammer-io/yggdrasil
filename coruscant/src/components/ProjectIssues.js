import React, { Component } from 'react'
import { connect } from 'react-redux'
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
import { register } from './../actions/session'

const mapDispatchToProps = {
  register
}

@connect(null, mapDispatchToProps)
class ProjectIssues extends Component {
  getIssueIcon(type) {
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

  renderIssues() {
    const ret = []
    for (const i in this.props.issues) {
      if (i > 4) {
        ret.push(this.renderIssue({
          name: 'See more...',
          type: 'SeeMore',
          url: this.props.moreIssues
        }))
        break
      }
      ret.push(this.renderIssue(this.props.issues[i]))
    }
    return ret
  }

  renderIssue(info) {
    return (
      <ListItem
        href={info.url}
        primaryText={info.name}
        secondaryText={info.date}
        leftIcon={this.getIssueIcon(info.type)}
      />
    )
  }

  render() {
    return (
      <div style={Theme.projectDetails.projectContainer}>
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
  moreIssues: PropTypes.string.isRequired
}


export default ProjectIssues
