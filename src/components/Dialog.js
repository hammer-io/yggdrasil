import React from 'react'
import { Dialog as MUIDialog, FlatButton } from 'material-ui'
import PropTypes from 'prop-types'

const Dialog = ({
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
    <MUIDialog
      actions={actions}
      modal={false}
      open={open}
    >
      { text }
    </MUIDialog>
  )
}

Dialog.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Dialog
