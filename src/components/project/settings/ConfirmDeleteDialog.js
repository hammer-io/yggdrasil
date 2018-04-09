import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteProject } from '../../../actions/project'

const mapDispatchToProps = {
  deleteProject
}

const mapStateToProps = state => ({
  session: state.session
})

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
class ConfirmDeleteDialog extends React.Component {
  constructor(props) {
    super(props)
    this.onProjectNameTextFieldChange = this.onProjectNameTextFieldChange.bind(this)
  }

  state = {
    open: false,
    isDeleteable: false
  };

  onProjectNameTextFieldChange = (event) => {
    const isDeleteable = (event.target.value === this.props.project.projectName)
    this.setState({ isDeleteable, open: true })
  }

  handleDeleteButtonClick = async () => {
    const { error } =
      await this.props.deleteProject(this.props.session.authToken, this.props.project.id)
    if (error == null) {
      console.log('success')
      this.props.history.push('/home')
    }

    this.setState({ open: false })
  }

  handleCancelButtonClick = () => {
    this.setState({ open: false })
  };

  handleOpen = () => {
    this.setState({ open: true })
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onClick={this.handleCancelButtonClick}
      />,
      <FlatButton
        secondary
        disabled={!this.state.isDeleteable}
        label="Delete"
        onClick={this.handleDeleteButtonClick}
      />,
    ]

    return (
      <div>
        <RaisedButton
          secondary
          label="Delete Project"
          onClick={this.handleOpen}
        />
        <Dialog
          title="Confirm Delete"
          actions={actions}
          modal
          open={this.state.open}
        >
          <p>
          Are you sure that you want to delete this project? This operation cannot be undone.
          </p>
          <p>
          Type project name <code>({this.props.project.projectName})</code> in text box to confirm.
          </p>

          <TextField placeholder="Project Name" onChange={this.onProjectNameTextFieldChange} />
        </Dialog>
      </div>
    )
  }
}

ConfirmDeleteDialog.propTypes = {
  deleteProject: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired
}

const ExportedConfirmDeleteDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmDeleteDialog)

export default withRouter(ExportedConfirmDeleteDialog)
