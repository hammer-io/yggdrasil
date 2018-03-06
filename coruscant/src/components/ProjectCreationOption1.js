import React from 'react'
import PropTypes from 'prop-types'

import ProjectOptionTile from './../components/ProjectOptionTile'
import Divider from './../components/Divider'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  subContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '500px'
  },
}

const ProjectCreationOption1 = ({
  clickGithub,
  clickTravis,
  clickNoSource,
  clickNoCI,
  githubSelected,
  noSourceSelected,
  travisSelected,
  noCISelected,
  githubDisabled,
  travisDisabled
}) => (
  <div style={styles.container}>
    <div style={styles.subContainer}>
      <h1>Source Control</h1>
      <div style={styles.optionsContainer}>
        <ProjectOptionTile onClick={clickGithub} selected={githubSelected} disabled={githubDisabled} option="github" />
        <ProjectOptionTile onClick={clickNoSource} selected={noSourceSelected} option="none" />
      </div>
    </div>
    <Divider />
    <div style={styles.subContainer}>
      <h1>Continuous Integration</h1>
      <div style={styles.optionsContainer}>
        <ProjectOptionTile onClick={clickTravis} selected={travisSelected} disabled={travisDisabled} option="travis" />
        <ProjectOptionTile onClick={clickNoCI} selected={noCISelected} option="none" />
      </div>
    </div>
  </div>
)

ProjectCreationOption1.propTypes = {
  clickGithub: PropTypes.func.isRequired,
  clickTravis: PropTypes.func.isRequired,
  clickNoSource: PropTypes.func.isRequired,
  clickNoCI: PropTypes.func.isRequired,
  githubSelected: PropTypes.bool.isRequired,
  noSourceSelected: PropTypes.bool.isRequired,
  travisSelected: PropTypes.bool.isRequired,
  noCISelected: PropTypes.bool.isRequired,
  githubDisabled: PropTypes.bool.isRequired,
  travisDisabled: PropTypes.bool.isRequired
}

export default ProjectCreationOption1
