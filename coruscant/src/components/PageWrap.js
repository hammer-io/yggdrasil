import React, { Component } from 'react'
import { Card, CardActions, CardMedia } from 'material-ui/Card'
import PropTypes from 'prop-types'
import Theme from './../../style/theme'

const styles = {
  container: {
    padding: Theme.padding.tiny
  },
  contained: {
    width: 'fluid',
    maxWidth: 1200,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  noPadding: {
    padding: 0
  }
}


class PageWrap extends Component {
  static getActions(renderActions) {
    if (renderActions) {
      return (<CardActions style={styles.noPadding}>{ renderActions() }</CardActions>)
    }
    return ''
  }

  render() {
    return (
      <div style={styles.container}>
        <h2 style={styles.contained}>{this.props.title}</h2>
        <Card style={styles.contained}>
          <CardMedia>
            {
              this.props.children
            }
          </CardMedia>
          {
            PageWrap.getActions(this.props.renderActions)
          }
        </Card>
      </div>
    )
  }
}

PageWrap.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  // renderContents: PropTypes.func.isRequired,
  renderActions: PropTypes.func
}

PageWrap.defaultProps = {
  renderActions: () => ''
}

export default PageWrap
