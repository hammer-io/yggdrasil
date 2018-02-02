import React from 'react'
import PropTypes from 'prop-types'
import { Paper } from 'material-ui'
import Divider from 'material-ui/Divider'
import { List, ListItem } from 'material-ui/List'
import Theme from '../../style/theme'

class ProjectLinks extends React.PureComponent {
  render() {
    return (
      <div>
        <Paper style={Theme.projectDetails.header}>
          <div style={Theme.projectDetails.headerText}>Connected Services</div>
          <Divider />

          <List>
            <ListItem
              href={this.props.githubUrl}
              primaryText="Github"
            />
            <ListItem
              href={this.props.travisUrl}
              primaryText="Travis-ci"
            />
            <ListItem
              href={this.props.herokuUrl}
              primaryText="Heroku"
            />
          </List>

        </Paper>
      </div>
    )
  }
}

ProjectLinks.propTypes = {
  githubUrl: PropTypes.string.isRequired,
  travisUrl: PropTypes.string.isRequired,
  herokuUrl: PropTypes.string.isRequired
}

export default ProjectLinks
