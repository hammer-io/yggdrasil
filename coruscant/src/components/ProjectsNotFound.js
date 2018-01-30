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
    color: Theme.colors.grey400,
    height: '200px',
    width: '200px'
  },
  text: {
    fontFamily: Theme.font.family.regular,
    color: Theme.colors.grey400
  }
}

const ProjectsNotFound = () => (
  <div style={styles.container}>
    <Icon style={styles.icon} />
    <h3 style={styles.text}>No projects found</h3>
  </div>
)

export default ProjectsNotFound
