import React, { Component } from 'react'
import { connect } from 'react-redux'
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
import Theme from '../../style/theme'
import { register } from './../actions/session'


const styles = {
  header: {
    width: '90%',
    textAlign: 'center',
    display: 'inline-block',
    padding: 10
  },
  headerContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  ProjectNameFont: {
    fontFamily: 'Arial',
    fontWeight: 'normal',
    fontSize: 34,
    display: 'inline'
  },
  statusIcon: {
    height: 24,
    width: 24,
    marginLeft: 20,
    marginRight: 3
  }
}

const mapDispatchToProps = {
  register
}

@connect(null, mapDispatchToProps)
class ProjectHeader extends Component {
  renderStatus() {
    switch (this.props.projectStatus) {
      case 'Healthy':
        return (
          <div style={Theme.projectDetails.descriptionText}>
            <Healthy style={styles.statusIcon} color={green500} />
            <div style={Theme.projectDetails.descriptionText}>App is healthy</div>
          </div>
        )
      case 'Warning':
        return (
          <div style={Theme.projectDetails.descriptionText}>
            <Warning style={styles.statusIcon} color={yellow500} />
            <div style={Theme.projectDetails.descriptionText}>Tests failing or something</div>
          </div>
        )
      case 'Failing':
        return (
          <div style={Theme.projectDetails.descriptionText}>
            <Failing style={styles.statusIcon} color={red500} />
            <div style={Theme.projectDetails.descriptionText}>Something is broken</div>
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
          <div style={Theme.projectDetails.descriptionText}>
            <b>Owner:</b> {this.props.projectOwner}
          </div>
          <div style={Theme.projectDetails.descriptionText}>
            <b>Last Updated:</b> {this.props.lastUpdated}
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
