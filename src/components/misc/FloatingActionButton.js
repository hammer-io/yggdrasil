import React from 'react'
import PropTypes from 'prop-types'
import { FloatingActionButton as MUIFloatingActionButton } from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add'

const styles = {
  button: {
    position: 'fixed',
    right: '50px',
    bottom: '5%',
    zIndex: 2
  }
}

const FloatingActionButton = ({ onClick }) => (
  <MUIFloatingActionButton style={styles.button} onClick={onClick}>
    <ContentAdd />
  </MUIFloatingActionButton>
)

FloatingActionButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default FloatingActionButton
