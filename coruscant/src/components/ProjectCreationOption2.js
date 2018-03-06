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

const ProjectCreationOption2 = ({
  clickDocker,
  clickHeroku,
  clickNoContainer,
  clickNoDeploy,
  dockerSelected,
  noContainerSelected,
  herokuSelected,
  noDeploySelected,
  dockerDisabled,
  herokuDisabled
}) => (
  <div style={styles.container}>
    <div style={styles.subContainer}>
      <h1>Containerization</h1>
      <div style={styles.optionsContainer}>
        <ProjectOptionTile onClick={clickDocker} selected={dockerSelected} disabled={dockerDisabled} option="docker" />
        <ProjectOptionTile onClick={clickNoContainer} selected={noContainerSelected} option="none" />
      </div>
    </div>
    <Divider />
    <div style={styles.subContainer}>
      <h1>Deployment</h1>
      <div style={styles.optionsContainer}>
        <ProjectOptionTile onClick={clickHeroku} selected={herokuSelected} disabled={herokuDisabled} option="heroku" />
        <ProjectOptionTile onClick={clickNoDeploy} selected={noDeploySelected} option="none" />
      </div>
    </div>
  </div>
)

ProjectCreationOption2.propTypes = {
  clickDocker: PropTypes.func.isRequired,
  clickHeroku: PropTypes.func.isRequired,
  clickNoContainer: PropTypes.func.isRequired,
  clickNoDeploy: PropTypes.func.isRequired,
  dockerSelected: PropTypes.bool.isRequired,
  noContainerSelected: PropTypes.bool.isRequired,
  herokuSelected: PropTypes.bool.isRequired,
  noDeploySelected: PropTypes.bool.isRequired,
  dockerDisabled: PropTypes.bool.isRequired,
  herokuDisabled: PropTypes.bool.isRequired
}

export default ProjectCreationOption2
