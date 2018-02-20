import React from 'react'

import Theme from '../../../style/theme'

const styles = {
  container: {
    padding: Theme.padding.tiny
  }
}

const NotificationSettings = () => (
  <div style={styles.container}>
    <h2>Notification Settings</h2>
    <p>
      TODO: Here the user will be able to enable/disable
      email notifications for different events.
    </p>
  </div>
)

export default NotificationSettings
