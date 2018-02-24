import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Tab, Tabs } from 'material-ui'
import PropTypes from 'prop-types'

import AccountSettings from '../components/user-settings-tabs/AccountSettings'
import InvitesSettings from '../components/user-settings-tabs/InvitesSettings'
import NotificationSettings from '../components/user-settings-tabs/NoficiationSettings'
import PageWrap from '../components/PageWrap'
import ProfileSettings from '../components/user-settings-tabs/ProfileSettings'
import { getUserInvites } from '../actions/invite'


const tabValues = ['profile', 'invites', 'accounts', 'notification']

// TODO: Load this dynamically
const accounts = [
  {
    name: 'GitHub',
    linked: false,
    onConnectHandler: () => { console.log('TODO: Connecting to GitHub...') }
  },
  {
    name: 'Heroku',
    linked: true,
    onConnectHandler: () => { console.log('TODO: Connecting to Heroku...') }
  }
]

// TODO: Create some view to add accounts
function onAddAccount() {
  console.log('TODO: Adding account...')
}

// TODO
function onSaveProfileSettings() {
  console.log('TODO: Saving profile settings...')
}

const mapStateToProps = state => ({
  session: state.session,
  user: state.user,
  invites: state.invites
})

const mapDispatchToProps = {
  getUserInvites
}

@connect(mapStateToProps, mapDispatchToProps)
class UserSettings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.match.params.tabValue,
    }
  }

  async componentDidMount() {
    // Catch any bad paths in the settings subdirectory
    const currentTabValue = this.props.match.params.tabValue
    if (!tabValues.includes(currentTabValue)) {
      console.log(`There is no settings page for '${currentTabValue}'! Redirecting to '/settings/profile'`)
      this.state.value = 'profile'
      this.props.history.replace('/settings/profile')
    }
    const { session, getUserInvites } = this.props
    await getUserInvites(session.authToken)
  }

  handleChange = (value) => {
    this.setState({
      value
    })
  }

  render() {
    return (
      <PageWrap title="Settings">
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
        >
          <Tab label="Profile" value="profile" containerElement={<Link to="/settings/profile" />}>
            <ProfileSettings
              user={this.props.session.user}
              onSaveProfileSettings={onSaveProfileSettings}
            />
          </Tab>
          <Tab label="Invites" value="invites" containerElement={<Link to="/settings/invites" />}>
            <InvitesSettings invites={this.props.invites} />
          </Tab>
          <Tab label="Accounts" value="accounts" containerElement={<Link to="/settings/accounts" />}>
            <AccountSettings accounts={accounts} onAddAccount={onAddAccount} />
          </Tab>
          <Tab label="Notification" value="notification" containerElement={<Link to="/settings/notification" />}>
            <NotificationSettings />
          </Tab>
        </Tabs>
      </PageWrap>
    )
  }
}

UserSettings.propTypes = {
  history: PropTypes.any.isRequired,
  session: PropTypes.object.isRequired,
  match: PropTypes.any.isRequired,
  invites: PropTypes.object.isRequired,
  getUserInvites: PropTypes.func.isRequired
}

export default withRouter(UserSettings)
