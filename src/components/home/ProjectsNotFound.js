import { Link } from 'react-router-dom'
import React from 'react'
import Icon from 'material-ui/svg-icons/file/folder-open'
import Theme from '../../../style/theme'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '100px'
  },
  icon: {
    color: Theme.colors.neutlight_d2,
    height: '200px',
    width: '200px'
  },
  text: {
    color: Theme.colors.neutlight_d2
  },
  link: {
    color: Theme.palette.anchorColor
  }
}

const ProjectsNotFound = () => (
  <div style={styles.container}>
    <Icon style={styles.icon} />
    <h3 style={styles.text}>Create a <Link style={styles.link} to="/projects/new">New Project</Link> to get started!</h3>
  </div>
)

export default ProjectsNotFound
