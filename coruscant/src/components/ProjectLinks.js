import React from 'react'
import PropTypes from 'prop-types'
import { Paper } from 'material-ui'
import Divider from 'material-ui/Divider'
import { List, ListItem } from 'material-ui/List'
import Theme from '../../style/theme'

class ProjectLinks extends React.PureComponent {
  static renderItem(url, text, display) {
    if (display) {
      return (
        <ListItem
          href={url}
          primaryText={text}
        />
      )
    }
  }

  render() {
    const anythingConnected = !(
      this.props.githubUrl || this.props.travisUrl || this.props.githubUrl
    )
    return (
      <div>
        <Paper style={Theme.projectDetails.header}>
          <div style={Theme.projectDetails.headerText}>Connected Services</div>
          <Divider />

          <List>
            {ProjectLinks.renderItem(`https://github.com/${this.props.githubUrl}`, 'Github', this.props.githubUrl)}
            {ProjectLinks.renderItem(`https://travis-ci.org/${this.props.travisUrl}`, 'Travis', this.props.travisUrl)}
            {ProjectLinks.renderItem(`https://dashboard.heroku.com/apps/${this.props.herokuUrl}`, 'Heroku', this.props.herokuUrl)}
            {ProjectLinks.renderItem(null, 'You have no connected services', anythingConnected)}
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
