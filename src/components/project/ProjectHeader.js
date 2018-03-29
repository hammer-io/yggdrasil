import React, { Component } from 'react'
import { Chip, Avatar } from 'material-ui'
import PropTypes from 'prop-types'
import SvgIconPeople from 'material-ui/svg-icons/social/people'
import SvgIconUpdate from 'material-ui/svg-icons/action/update'
import SvgIconLanguage from 'material-ui/svg-icons/action/language'
import SvgIconHealthy from 'material-ui/svg-icons/navigation/check'
import SvgIconWarning from 'material-ui/svg-icons/notification/priority-high'
import SvgIconFailing from 'material-ui/svg-icons/navigation/close'

import Theme from '../../../style/theme'

const styles = {
  container: {
    padding: Theme.padding.tiny,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  ProjectNameFont: {
    fontSize: 34
  },
  projectDescription: {
    fontSize: 16,
    marginTop: Theme.padding.tiny,
    marginBottom: Theme.padding.tiny,
    fontStyle: 'italic',
    letterSpacing: 1.5,
    color: Theme.colors.neutdark_u1
  },
  chipWrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: 4
  }
}

function renderDescription(description) {
  if (description) {
    return <div style={styles.projectDescription}>{description}</div>
  }
}

function renderAuthors(authors) {
  if (authors) {
    return (
      <Chip style={styles.chip}>
        <Avatar icon={<SvgIconPeople />} />
        {authors}
      </Chip>
    )
  }
}

function renderLicense(license) {
  if (license) {
    return (
      <Chip style={styles.chip}>
        <Avatar icon={<SvgIconLanguage />} />
        {license}
      </Chip>
    )
  }
}

function renderVersion(version) {
  if (version) {
    return (
      <Chip style={styles.chip}>
        <Avatar size={32}>V</Avatar>
        {version}
      </Chip>
    )
  }
}

class ProjectHeader extends Component {
  renderStatus() {
    switch (this.props.projectStatus) {
      case 'Healthy':
        return (
          <Chip style={styles.chip} backgroundColor={Theme.colors.green200}>
            <Avatar
              icon={<SvgIconHealthy />}
              color={Theme.colors.white}
              backgroundColor={Theme.colors.green500}
            />
            Healthy
          </Chip>
        )
      case 'Warning':
        return (
          <Chip style={styles.chip} backgroundColor={Theme.colors.yellow500}>
            <Avatar
              icon={<SvgIconWarning />}
              color={Theme.colors.white}
              backgroundColor={Theme.colors.yellow800}
            />
          Failing Tests
          </Chip>
        )
      case 'Failing':
        return (
          <Chip style={styles.chip} backgroundColor={Theme.colors.red300}>
            <Avatar
              icon={<SvgIconFailing />}
              color={Theme.colors.white}
              backgroundColor={Theme.colors.red600}
            />
            Down
          </Chip>
        )
      default:
    }
  }

  render() {
    const updatedAtString = new Date(Date.parse(this.props.updatedAt)).toLocaleString()
    return (
      <div style={styles.container}>
        <div style={styles.ProjectNameFont}>{this.props.projectName}</div>
        {renderDescription(this.props.description)}
        <div style={styles.chipWrapper}>
          {this.renderStatus()}
          {renderAuthors(this.props.authors)}
          {renderLicense(this.props.license)}
          {renderVersion(this.props.version)}
          <Chip style={styles.chip}>
            <Avatar icon={<SvgIconUpdate />} />
            {updatedAtString}
          </Chip>
        </div>
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
