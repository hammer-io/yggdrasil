import React, { Component } from 'react'
import { RaisedButton } from 'material-ui'
import PropTypes from 'prop-types'

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

class AccountSettings extends Component {
  // eslint-disable-next-line class-methods-use-this
  renderAccountInfo(account) {
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

  render() {
    return (
      <div style={styles.container}>
        <h2>Linked Accounts</h2>
        {this.props.accounts.map(this.renderAccountInfo)}
        <hr style={styles.hr} />
        <div style={styles.bottomActionSpacer}>
          <NewFloatingActionButton onClick={this.props.onAddAccount} />
        </div>
      </div>
    )
  }
}

AccountSettings.propTypes = {
  accounts: PropTypes.array.isRequired,
  onAddAccount: PropTypes.func.isRequired
}

export default AccountSettings
