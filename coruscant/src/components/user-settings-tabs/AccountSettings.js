import React from 'react'
import { RaisedButton } from 'material-ui'

import NewFloatingActionButton from '../../components/NewFloatingActionButton'
import Theme from '../../../style/theme'

const styles = {
  container: {
    padding: Theme.padding.tiny
  },
  bottomActionSpacer: {
    height: Theme.padding.large
  },
  hr: {
    height: 1,
    border: 0,
    borderTop: `1px solid ${Theme.palette.primary3Color}`,
    marginTop: Theme.padding.small,
    marginBottom: Theme.padding.small
  }
}

function onConnectToGithub() {
  console.log('TODO: Connecting to GitHub...')
}

function onAddAccount() {
  console.log('TODO: Adding account...')
}

const AccountSettings = () => (
  <div style={styles.container}>
    <h2>Linked Accounts</h2>
    <div>
      <h3>GitHub</h3>
      <p>
        This account has not been connected yet. Please click the &quot;Connect&quot; button
        below to link your GitHub account to Yggdrasil.
      </p>
      <RaisedButton label="Connect to Github" primary onClick={onConnectToGithub} />
    </div>
    <hr style={styles.hr} />
    <div style={styles.bottomActionSpacer}>
      <NewFloatingActionButton onClick={onAddAccount} />
    </div>
  </div>
)

export default AccountSettings
