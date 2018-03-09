import React from 'react'
import PropTypes from 'prop-types'
import { FloatingActionButton } from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add'

const styles = {
  button: {
    position: 'absolute',
    right: '2.5%',
    bottom: '5%'
  }
}

const NewFloatingActionButton = ({ onClick }) => (
  <FloatingActionButton style={styles.button} onClick={onClick}>
    <ContentAdd />
  </FloatingActionButton>
)

NewFloatingActionButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default NewFloatingActionButton
