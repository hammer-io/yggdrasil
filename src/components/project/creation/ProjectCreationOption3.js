import React from 'react'
import PropTypes from 'prop-types'

import ProjectOptionTile from './ProjectOptionTile'
import Divider from '../../misc/Divider'

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
    width: '400px'
  },
}

const ProjectCreationOption3 = ({
  clickExpress,
  clickMocha,
  clickSequelize,
  clickNoBackend,
  clickNoTest,
  clickNoORM,
  expressSelected,
  noBackendSelected,
  mochaSelected,
  noTestSelected,
  sequelizeSelected,
  noORMSelected,
}) => (
  <div style={styles.container}>
    <div style={styles.subContainer}>
      <h1>Web Framework</h1>
      <div style={styles.optionsContainer}>
        <ProjectOptionTile onClick={clickExpress} selected={expressSelected} option="express" />
        <ProjectOptionTile onClick={clickNoBackend} selected={noBackendSelected} option="none" />
      </div>
    </div>
    <Divider />
    <div style={styles.subContainer}>
      <h1>Test Framework</h1>
      <div style={styles.optionsContainer}>
        <ProjectOptionTile onClick={clickMocha} selected={mochaSelected} option="mocha" />
        <ProjectOptionTile onClick={clickNoTest} selected={noTestSelected} option="none" />
      </div>
    </div>
    <Divider />
    <div style={styles.subContainer}>
      <h1>ORM Framework</h1>
      <div style={styles.optionsContainer}>
        <ProjectOptionTile onClick={clickSequelize} selected={sequelizeSelected} option="sequelize" />
        <ProjectOptionTile onClick={clickNoORM} selected={noORMSelected} option="none" />
      </div>
    </div>
  </div>
)

ProjectCreationOption3.propTypes = {
  clickExpress: PropTypes.func.isRequired,
  clickMocha: PropTypes.func.isRequired,
  clickSequelize: PropTypes.func.isRequired,
  clickNoBackend: PropTypes.func.isRequired,
  clickNoTest: PropTypes.func.isRequired,
  clickNoORM: PropTypes.func.isRequired,
  expressSelected: PropTypes.bool.isRequired,
  noBackendSelected: PropTypes.bool.isRequired,
  mochaSelected: PropTypes.bool.isRequired,
  noTestSelected: PropTypes.bool.isRequired,
  sequelizeSelected: PropTypes.bool.isRequired,
  noORMSelected: PropTypes.bool.isRequired,
}

export default ProjectCreationOption3
