import React from 'react'
import { Dialog, FlatButton } from 'material-ui'
import PropTypes from 'prop-types'

const ProjectCreationDialog = ({
  onCancel,
  onContinue,
  closeDialog
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
      open={this.state.open}
      onRequestClose={closeDialog}
    >
      Are you sure you want to continue? All changes will be lost.
    </Dialog>
  )
}

ProjectCreationDialog.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
  closeDialog: PropTypes.func.isRequired
}

export default ProjectCreationDialog
