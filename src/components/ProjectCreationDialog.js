import React from 'react'
import { Dialog, FlatButton } from 'material-ui'
import PropTypes from 'prop-types'

const ProjectCreationDialog = ({
  onCancel,
  onContinue,
  open,
  text
}) => {
  const actions = [
    <FlatButton
      label="Cancel"
      primary
      onClick={onCancel}
    />,
    <FlatButton
      label="Continue"
      primary
      onClick={onContinue}
    />
  ]

  return (
    <Dialog
      actions={actions}
      modal={false}
      open={open}
    >
      { text }
    </Dialog>
  )
}

ProjectCreationDialog.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default ProjectCreationDialog
