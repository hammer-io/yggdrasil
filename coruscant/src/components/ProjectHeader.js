import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Paper } from 'material-ui'
import Healthy from 'material-ui/svg-icons/action/check-circle'
import Warning from 'material-ui/svg-icons/content/report'
import Failing from 'material-ui/svg-icons/navigation/cancel'

import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreHorizIcon from 'material-ui/svg-icons/navigation/more-horiz'
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
    return (
      <div style={styles.headerContainer}>
        <Paper style={styles.header}>
          <div>
            <div style={styles.ProjectNameFont}>{this.props.projectName}</div>
            {this.renderStatus()}
            <IconMenu
              iconButtonElement={<IconButton><MoreHorizIcon /></IconButton>}
            >
              <MenuItem value="1" primaryText="Rename" />
              <MenuItem value="2" primaryText="Project Settings" />
              <MenuItem value="3" primaryText="Delete" />
            </IconMenu>
          </div>
          <div style={styles.descriptionText}>
            <div style={styles.bold}>Owner:</div> {this.props.projectOwner}
          </div>
          <div style={styles.descriptionText}>
            <div style={styles.bold}>Last Updated:</div>{this.props.lastUpdated}
          </div>


        </Paper>
      </div>
    )
  }
}


ProjectHeader.propTypes = {
  projectOwner: PropTypes.string.isRequired,
  lastUpdated: PropTypes.string.isRequired,
  projectName: PropTypes.string.isRequired,
  projectStatus: PropTypes.string.isRequired
}

export default ProjectHeader
