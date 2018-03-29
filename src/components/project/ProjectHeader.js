import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Paper } from 'material-ui'
import Healthy from 'material-ui/svg-icons/action/check-circle'
import Warning from 'material-ui/svg-icons/content/report'
import Failing from 'material-ui/svg-icons/navigation/cancel'

import { yellow500, red500, green500 } from 'material-ui/styles/colors'

const styles = {
  bold: {
    fontWeight: 'bold',
    display: 'inline'
  },
  header: {
    width: '90%',
    textAlign: 'center',
    padding: 10
  },
  headerContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  ProjectNameFont: {
    fontSize: 34,
    display: 'inline'
  },
  statusIcon: {
    height: 24,
    width: 24,
    marginLeft: 20,
    marginRight: 3
  },
  descriptionText: {
    fontSize: 16,
    display: 'inline',
    marginRight: 5,
    marginLeft: 5
  }
}

function descriptionTag(tag, value) {
  if (value) {
    return (
      <div style={styles.descriptionText}>
        <div style={styles.bold}>{tag}</div>{value}
      </div>
    )
  }
}

class ProjectHeader extends Component {
  renderStatus() {
    switch (this.props.projectStatus) {
      case 'Healthy':
        return (
          <div style={styles.descriptionText}>
            <Healthy style={styles.statusIcon} color={green500} />
            <div style={styles.descriptionText}>App is healthy</div>
          </div>
        )
      case 'Warning':
        return (
          <div style={styles.descriptionText}>
            <Warning style={styles.statusIcon} color={yellow500} />
            <div style={styles.descriptionText}>Tests failing or something</div>
          </div>
        )
      case 'Failing':
        return (
          <div style={styles.descriptionText}>
            <Failing style={styles.statusIcon} color={red500} />
            <div style={styles.descriptionText}>Something is broken</div>
          </div>
        )
      default:
    }
  }

  render() {
    const updatedAtString = new Date(Date.parse(this.props.updatedAt)).toLocaleString()
    return (
      <div style={styles.headerContainer}>
        <Paper style={styles.header}>
          <div>
            <div style={styles.ProjectNameFont}>{this.props.projectName}</div>
            {this.renderStatus()}
          </div>
          <div>
            {descriptionTag('', this.props.description)}
          </div>
          {descriptionTag('Authors: ', this.props.authors)}
          {descriptionTag('License: ', this.props.license)}
          {descriptionTag('Version: ', this.props.version)}
          {descriptionTag('Last Updated: ', updatedAtString)}


        </Paper>
      </div>
    )
  }
}

ProjectHeader.defaultProps = {
  authors: '',
  description: '',
  license: '',
  version: ''
}

ProjectHeader.propTypes = {
  authors: PropTypes.string,
  description: PropTypes.string,
  updatedAt: PropTypes.string.isRequired,
  license: PropTypes.string,
  version: PropTypes.string,
  projectName: PropTypes.string.isRequired,
  projectStatus: PropTypes.string.isRequired
}

export default ProjectHeader
