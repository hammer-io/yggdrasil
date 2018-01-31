import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Paper } from 'material-ui'
import ReactMarkdown from 'react-markdown'
import Divider from 'material-ui/Divider'
import Theme from '../../style/theme'
import { register } from './../actions/session'

const mapDispatchToProps = {
  register
}

@connect(null, mapDispatchToProps)
class ProjectDescription extends Component {
  render() {
    return (
      <div style={Theme.projectDetails.projectContainer}>
        <Paper style={Theme.projectDetails.header}>
          <div style={Theme.projectDetails.headerText}>Project Description</div>
          <Divider />
          <div>
            <ReactMarkdown source={this.props.content} />
          </div>
        </Paper>
      </div>
    )
  }
}

ProjectDescription.propTypes = {
  content: PropTypes.string.isRequired
}


export default ProjectDescription
