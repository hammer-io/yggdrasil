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
  travisDisabled,
  githubErrorText,
  travisErrorText
}) => (
  <div style={styles.container}>
    <div style={styles.subContainer}>
      <h1>Source Control</h1>
      <div style={styles.optionsContainer}>
        <div style={styles.tileContainer}>
          <ProjectOptionTile onClick={clickGithub} selected={githubSelected} disabled={githubDisabled} option="github" />
          <span style={styles.errorText}>{ githubErrorText }</span>
        </div>
        <div style={styles.tileContainer}>
          <ProjectOptionTile onClick={clickNoSource} selected={noSourceSelected} option="none" />
        </div>
      </div>
    </div>
    <Divider />
    <div style={styles.subContainer}>
      <h1>Continuous Integration</h1>
      <div style={styles.optionsContainer}>
        <div style={styles.tileContainer}>
          <ProjectOptionTile onClick={clickTravis} selected={travisSelected} disabled={travisDisabled} option="travis" />
          <span style={styles.errorText}>{ travisErrorText }</span>
        </div>
        <div style={styles.tileContainer}>
          <ProjectOptionTile onClick={clickNoCI} selected={noCISelected} option="none" />
        </div>
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
  travisDisabled: PropTypes.bool.isRequired,
  githubErrorText: PropTypes.string.isRequired,
  travisErrorText: PropTypes.string.isRequired
}

export default ProjectCreationOption1
