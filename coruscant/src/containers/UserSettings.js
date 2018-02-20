import React from 'react'
import { withRouter } from 'react-router-dom'
import { Tab, Tabs } from 'material-ui'

import AccountSettings from '../components/user-settings-tabs/AccountSettings'
import InvitesSettings from '../components/user-settings-tabs/InvitesSettings'
import NotificationSettings from '../components/user-settings-tabs/NoficiationSettings'
import PageWrap from '../components/PageWrap'
import ProfileSettings from '../components/user-settings-tabs/ProfileSettings'

function renderTabs() {
  return (
    <Tabs>
      <Tab label="Profile">
        <ProfileSettings />
      </Tab>
      <Tab label="Invites">
        <InvitesSettings />
      </Tab>
      <Tab label="Accounts">
        <AccountSettings />
      </Tab>
      <Tab label="Nofication" >
        <NotificationSettings />
      </Tab>
    </Tabs>
  )
}

const UserSettings = () => (
  <PageWrap title="Settings" renderContents={renderTabs} />
)

export default withRouter(UserSettings)
