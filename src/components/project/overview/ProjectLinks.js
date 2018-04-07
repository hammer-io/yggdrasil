import React from 'react'
import Flexbox from 'flexbox-react'
import PropTypes from 'prop-types'
import { Card, CardText, CardTitle } from 'material-ui'
import { List, ListItem } from 'material-ui/List'

import Theme from '../../../../style/theme'

const styles = {
  container: {
    width: '100%',
    margin: Theme.padding.tiny
  },
  listItem: {
    textAlign: 'center'
  }
}

class ProjectLinks extends React.PureComponent {
  static renderItem(url, text, display) {
    if (display) {
      return (
        <ListItem
          target="_blank"
          href={url}
          primaryText={text}
          style={styles.listItem}
        />
      )
    }
  }

  render() {
    const anythingConnected = !(
      this.props.githubUrl || this.props.travisUrl || this.props.githubUrl
    )
    return (
      <Flexbox>
        <Card style={styles.container}>
          <CardTitle title="Connected Services" />
          <CardText>
            <List>
              {ProjectLinks.renderItem(`https://github.com/${this.props.githubUrl}`, 'Github', this.props.githubUrl)}
              {ProjectLinks.renderItem(`https://travis-ci.org/${this.props.travisUrl}`, 'Travis', this.props.travisUrl)}
              {ProjectLinks.renderItem(`https://dashboard.heroku.com/apps/${this.props.herokuUrl}`, 'Heroku', this.props.herokuUrl)}
              {ProjectLinks.renderItem(null, 'You have no connected services', anythingConnected)}
            </List>
          </CardText>
        </Card>
      </Flexbox>
    )
  }
}

ProjectLinks.defaultProps = {
  githubUrl: null,
  travisUrl: null,
  herokuUrl: null
}

ProjectLinks.propTypes = {
  githubUrl: PropTypes.string,
  travisUrl: PropTypes.string,
  herokuUrl: PropTypes.string
}

export default ProjectLinks
