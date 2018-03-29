/* eslint-disable react/prefer-stateless-function */
import Flexbox from 'flexbox-react'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BasicSpinner from '../BasicSpinner'
import Theme from '../../../style/theme'
import HeartbeatCount from '../statistics/HeartbeatCount'
import ProjectIssues from './ProjectIssues'
import ProjectBuilds from './ProjectBuilds'
import ProjectLinks from './ProjectLinks'
import ProjectDescription from './ProjectDescription'

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
          <Flexbox
            flexDirection="row"
            flexWrap="wrap"
            width="100%"
            justifyContent="space-around"
            alignItems="flex-start"
          >
            <Flexbox>
              <HeartbeatCount projectId={project.id} />
            </Flexbox>
            <Flexbox>
              <ProjectIssues
                githubUrl={project.githubRepositoryName}
                projectId={project.id}
              />
            </Flexbox>
            <Flexbox>
              <ProjectBuilds
                travisUrl={project.travisRepositoryName}
                projectId={project.id}
              />
            </Flexbox>
            <Flexbox>
              <ProjectLinks
                travisUrl={project.travisRepositoryName}
                githubUrl={project.githubRepositoryName}
                herokuUrl={project.herokuApplicationName}
              />
            </Flexbox>
          </Flexbox>
          <Flexbox flexDirection="row" justifyContent="center">
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
