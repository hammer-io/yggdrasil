import React from 'react'
import Icon from 'material-ui/svg-icons/social/sentiment-dissatisfied'
import Theme from './../../style/theme'

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
  }
}

const ProjectsNotFound = () => (
  <div style={styles.container}>
    <Icon style={styles.icon} />
    <h3 style={styles.text}>No projects found</h3>
  </div>
)

export default ProjectsNotFound
