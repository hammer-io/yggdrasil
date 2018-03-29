/* eslint-disable react/prefer-stateless-function */
import Flexbox from 'flexbox-react'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BasicSpinner from '../misc/BasicSpinner'
import Theme from '../../../style/theme'
import HeartbeatCount from './overview/HeartbeatCount'
import ProjectIssues from './overview/ProjectIssues'
import ProjectBuilds from './overview/ProjectBuilds'
import ProjectLinks from './overview/ProjectLinks'
import ProjectDescription from './overview/ProjectDescription'

const styles = {
  container: {
    padding: Theme.padding.tiny
  }
}

class OverviewTab extends Component {
  renderContents() {
    const { project } = this.props
    if (project) {
      return (
        <div>
          <Flexbox flexWrap="wrap" justifyContent="center">
            <HeartbeatCount projectId={project.id} />
            <ProjectIssues
              githubUrl={project.githubRepositoryName}
              projectId={project.id}
            />
            <ProjectBuilds
              travisUrl={project.travisRepositoryName}
              projectId={project.id}
            />
            <ProjectLinks
              travisUrl={project.travisRepositoryName}
              githubUrl={project.githubRepositoryName}
              herokuUrl={project.herokuApplicationName}
            />
          </Flexbox>
          <Flexbox>
            <ProjectDescription content={project.markdownDescription} />
          </Flexbox>
        </div>
      )
    }
    return <BasicSpinner />
  }

  render() {
    return (
      <div style={styles.container}>
        { this.renderContents() }
      </div>
    )
  }
}

OverviewTab.propTypes = {
  project: PropTypes.object.isRequired,
}

export default OverviewTab
