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

function onConnectToHeroku() {
  console.log('TODO: Connecting to Heroku...')
}

function onAddAccount() {
  console.log('TODO: Adding account...')
}

const accounts = [
  {
    name: 'GitHub',
    linked: false,
    onConnectHandler: onConnectToGithub
  },
  {
    name: 'Heroku',
    linked: true,
    onConnectHandler: onConnectToHeroku
  }
]

function renderAccountInfo(account) {
  const label = `Connect to ${account.name}`
  const info = (account.linked)
    ? (
      <div>
        <p>
          Display something useful about the linked account, such as... username?
        </p>
      </div>
    )
    : (
      <div>
        <p>
          This account has not been connected yet. Please click the &quot;Connect&quot; button
          below to link your GitHub account to Yggdrasil.
        </p>
        <RaisedButton label={label} primary onClick={account.onConnectHandler} />
      </div>
    )
  return (
    <div>
      <h3>{account.name}</h3>
      {info}
    </div>
  )
}

const AccountSettings = () => (
  <div style={styles.container}>
    <h2>Linked Accounts</h2>
    {accounts.map(renderAccountInfo)}
    <hr style={styles.hr} />
    <div style={styles.bottomActionSpacer}>
      <NewFloatingActionButton onClick={onAddAccount} />
    </div>
  </div>
)

export default AccountSettings
