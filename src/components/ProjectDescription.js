import React from 'react'
import PropTypes from 'prop-types'
import { Paper } from 'material-ui'
import ReactMarkdown from 'react-markdown'
import Theme from '../../style/theme'

const styles = {
  container: {
    flex: 1
  }
}

class ProjectDescription extends React.PureComponent {
  render() {
    return (
      <div style={styles.container}>
        <Paper style={Theme.projectDetails.header}>
          <div style={Theme.projectDetails.headerText}>Project Description</div>
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
