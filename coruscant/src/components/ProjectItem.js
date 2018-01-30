import React from 'react'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import PropTypes from 'prop-types'
import Theme from './../../style/theme'

const styles = {
  card: {
    height: '250px',
    width: '250px',
    margin: '15px'
  },
  title: {
    fontSize: '15px',
    fontWeight: Theme.font.weight.heavy
  },
  text: {
    height: '98px'
  },
  button: {
    fontWeight: Theme.font.weight.heavy,
    color: Theme.colors.cyan500
  }
}

const ProjectItem = ({
  title,
  description,
  projectId,
  viewProject
}) => (
  <Card style={styles.card}>
    <CardTitle
      title={title.toUpperCase()}
      titleStyle={styles.title}
    />
    <CardText style={styles.text}>{ description }</CardText>
    <CardActions>
      <FlatButton
        label="View Project"
        onClick={() => viewProject(projectId)}
        labelStyle={styles.button}
      />
    </CardActions>
  </Card>
)

ProjectItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired,
  viewProject: PropTypes.func.isRequired
}

export default ProjectItem
