/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import { RaisedButton, TextField, Snackbar } from 'material-ui'
import PropTypes from 'prop-types'

import BasicSpinner from '../misc/BasicSpinner'
import Theme from '../../../style/theme'
import { validateEmail } from './../../utils/validator'

const styles = {
  container: {
    padding: Theme.padding.tiny
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  button: {
    marginTop: '20px'
  }
}

class ProfileSettings extends Component {
  constructor(props) {
    super(props)

    this.state = {
      snackOpen: false,
      email: props.user.email || '',
      firstName: props.user.firstName || '',
      lastName: props.user.lastName || '',
      emailErrorText: ''
    }

    this.onSaveProfileSettings = this.onSaveProfileSettings.bind(this)
    this.emailOnChange = this.emailOnChange.bind(this)
    this.firstNameOnChange = this.firstNameOnChange.bind(this)
    this.lastNameOnChange = this.lastNameOnChange.bind(this)
    this.closeSnackbar = this.closeSnackbar.bind(this)
  }

  async onSaveProfileSettings() {
    const { email, firstName, lastName } = this.state
    const { user } = this.props
    const validEmail = validateEmail(email)
    if (typeof validEmail === 'string') {
      this.setState({ emailErrorText: validEmail })
      return
    }
    await this.props.onSaveProfileSettings({
      email: (email !== user.email ? email : undefined),
      firstName: (firstName !== user.firstName ? firstName : undefined),
      lastName: (lastName !== user.lastName ? lastName : undefined)
    })
    this.setState({ snackOpen: true })
  }

  emailOnChange(event, newValue) {
    this.setState({ email: newValue })
    this.setState({ emailErrorText: '' })
  }

  firstNameOnChange(event, newValue) {
    this.setState({ firstName: newValue })
  }

  lastNameOnChange(event, newValue) {
    this.setState({ lastName: newValue })
  }

  closeSnackbar() {
    this.setState({
      snackOpen: false
    })
  }

  renderContents() {
    const {
      snackOpen,
      email,
      firstName,
      lastName,
      emailErrorText
    } = this.state
    const { user } = this.props
    if (user) {
      return (
        <div style={styles.content}>
          <TextField
            floatingLabelText="Username"
            value={user.username}
            disabled
          />
          <TextField
            floatingLabelText="Email"
            errorText={emailErrorText}
            onChange={this.emailOnChange}
            value={email}
          />
          <TextField
            floatingLabelText="First Name"
            value={firstName}
            onChange={this.firstNameOnChange}
          />
          <TextField
            floatingLabelText="Last Name"
            onChange={this.lastNameOnChange}
            value={lastName}
          />
          <RaisedButton
            label="Save Changes"
            primary
            onClick={this.onSaveProfileSettings}
            style={styles.button}
          />
          <Snackbar
            open={snackOpen}
            message="Changes have been saved successfully!"
            autoHideDuration={3000}
            onRequestClose={this.closeSnackbar}
            action="Dismiss"
            onActionClick={this.closeSnackbar}
          />
        </div>
      )
    }
    return <BasicSpinner />
  }

  render() {
    return (
      <div style={styles.container}>
        <h2>Profile Settings</h2>
        { this.renderContents() }
      </div>
    )
  }
}

ProfileSettings.propTypes = {
  user: PropTypes.any.isRequired,
  onSaveProfileSettings: PropTypes.func.isRequired
}

export default ProfileSettings
