import React from 'react'
import PropTypes from 'prop-types'
import { Paper } from 'material-ui'
import ReactMarkdown from 'react-markdown'
import Divider from 'material-ui/Divider'
import Theme from '../../style/theme'

class ProjectDescription extends React.PureComponent {
  render() {
    return (
      <div>
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
