import React from 'react'
import { TextField, FlatButton, DropDownMenu, MenuItem } from 'material-ui'
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

}

export default ProjectCreationOption3
