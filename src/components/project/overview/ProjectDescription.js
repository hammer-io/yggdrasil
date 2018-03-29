import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardText } from 'material-ui'
import ReactMarkdown from 'react-markdown'
import Theme from '../../../../style/theme'

const styles = {
  container: {
    width: '100%',
    margin: Theme.padding.tiny
  }
}

class ProjectDescription extends React.PureComponent {
  render() {
    return (
      <Card style={styles.container}>
        <CardText>
          <ReactMarkdown source={this.props.content} />
        </CardText>
      </Card>
    )
  }
}

ProjectDescription.propTypes = {
  content: PropTypes.string.isRequired
}

export default ProjectDescription
