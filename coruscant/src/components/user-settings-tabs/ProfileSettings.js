/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import { RaisedButton, TextField, } from 'material-ui'
import PropTypes from 'prop-types'

import Theme from '../../../style/theme'

const styles = {
  container: {
    padding: Theme.padding.tiny
  }
}

class ProfileSettings extends Component {
  render() {
    return (
      <div style={styles.container}>
        <h2>Profile Settings</h2>
        <TextField
          floatingLabelText="Username"
          defaultValue="Bob"
          disabled
        /><br />
        <TextField
          floatingLabelText="Email"
          defaultValue="bob@afv.com"
        /><br />
        <TextField
          floatingLabelText="First Name"
          defaultValue="Bob"
        />
        <TextField
          floatingLabelText="Last Name"
          defaultValue="Sagat"
        /><br />
        <br />
        <RaisedButton label="Save Changes" primary onClick={this.props.onSaveProfileSettings} />
      </div>
    )
  }
}

ProfileSettings.propTypes = {
  onSaveProfileSettings: PropTypes.func.isRequired
}

export default ProfileSettings
