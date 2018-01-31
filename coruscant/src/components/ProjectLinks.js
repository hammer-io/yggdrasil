import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Paper } from 'material-ui'
import Divider from 'material-ui/Divider'
import { List, ListItem } from 'material-ui/List'
import { register } from './../actions/session'
import Theme from '../../style/theme'

const mapDispatchToProps = {
  register
}

@connect(null, mapDispatchToProps)
class ProjectLinks extends Component {
  render() {
    return (
      <div style={Theme.projectDetails.container}>
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
