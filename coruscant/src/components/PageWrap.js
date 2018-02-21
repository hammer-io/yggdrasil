import React from 'react'
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

function getActions(renderActions) {
  if (renderActions) {
    return (<CardActions style={styles.noPadding}>{ renderActions() }</CardActions>)
  }
  return ''
}

const PageWrap = ({ title, renderContents, renderActions }) => (
  <div style={styles.container}>
    <h2 style={styles.contained}>{title}</h2>
    <Card style={styles.contained}>
      <CardMedia>{ renderContents() }</CardMedia>
      {
        getActions(renderActions)
      }
    </Card>
  </div>
)

PageWrap.propTypes = {
  title: PropTypes.string.isRequired,
  renderContents: PropTypes.func.isRequired,
  renderActions: PropTypes.func
}

PageWrap.defaultProps = {
  renderActions: () => ''
}

export default PageWrap
