import React from 'react'
import { RaisedButton, TextField, } from 'material-ui'

import Theme from '../../../style/theme'

const styles = {
  container: {
    padding: Theme.padding.tiny
  }
}

function onSaveProfileSettings() {
  console.log('TODO: Saving profile settings...')
}

const ProfileSettings = () => (
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
    <RaisedButton label="Save Changes" primary onClick={onSaveProfileSettings} />
  </div>
)

export default ProfileSettings
