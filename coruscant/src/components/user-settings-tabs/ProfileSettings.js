/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import { RaisedButton, TextField, } from 'material-ui'
import PropTypes from 'prop-types'

import BasicSpinner from '../BasicSpinner'
import Theme from '../../../style/theme'

const styles = {
  container: {
    padding: Theme.padding.tiny
  }
}

class ProfileSettings extends Component {
  renderContents() {
    if (this.props.user) {
      return (
        <div>
          <TextField
            floatingLabelText="Username"
            value={this.props.user.username}
            disabled
          /><br />
          <TextField
            floatingLabelText="Email"
            defaultValue={this.props.user.email}
          /><br />
          <TextField
            floatingLabelText="First Name"
            defaultValue={this.props.user.firstName || ''}
          />
          <TextField
            floatingLabelText="Last Name"
            defaultValue={this.props.user.lastName || ''}
          /><br />
          <br />
          <RaisedButton label="Save Changes" primary onClick={this.props.onSaveProfileSettings} />
        </div>
      )
    }
    return <BasicSpinner />
  }
  render() {
    return (
      <div style={styles.container}>
        <h2>Profile Settings</h2>
        {this.renderContents()}
      </div>
    )
  }
}

ProfileSettings.propTypes = {
  user: PropTypes.any.isRequired,
  onSaveProfileSettings: PropTypes.func.isRequired
}

export default ProfileSettings
