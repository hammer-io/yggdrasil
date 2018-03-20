import React from 'react'
import PropTypes from 'prop-types'

import ProjectOptionTile from './../components/ProjectOptionTile'
import Divider from './../components/Divider'
import Theme from './../../style/theme'

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
  tileContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '150px',
    height: '200px'
  },
  errorText: {
    color: Theme.colors.red500,
    paddingTop: Theme.padding.tiny,
    fontSize: Theme.font.small.size,
    lineHeight: '12px'
  }
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
  herokuDisabled,
  herokuErrorText
}) => (
  <div style={styles.container}>
    <div style={styles.subContainer}>
      <h1>Containerization</h1>
      <div style={styles.optionsContainer}>
        <div style={styles.tileContainer}>
          <ProjectOptionTile onClick={clickDocker} selected={dockerSelected} disabled={dockerDisabled} option="docker" />
        </div>
        <div style={styles.tileContainer}>
          <ProjectOptionTile onClick={clickNoContainer} selected={noContainerSelected} option="none" />
        </div>
      </div>
    </div>
    <Divider />
    <div style={styles.subContainer}>
      <h1>Deployment</h1>
      <div style={styles.optionsContainer}>
        <div style={styles.tileContainer}>
          <ProjectOptionTile onClick={clickHeroku} selected={herokuSelected} disabled={herokuDisabled} option="heroku" />
          <span style={styles.errorText}>{ herokuErrorText }</span>
        </div>
        <div style={styles.tileContainer}>
          <ProjectOptionTile onClick={clickNoDeploy} selected={noDeploySelected} option="none" />
        </div>
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
  herokuDisabled: PropTypes.bool.isRequired,
  herokuErrorText: PropTypes.string.isRequired
}

export default ProjectCreationOption2
