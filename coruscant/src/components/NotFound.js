import React from 'react'
import Error from 'material-ui/svg-icons/alert/error'
import Theme from './../../style/theme'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '50px'
  },
  icon: {
    color: Theme.colors.grey400,
    height: '300px',
    width: '300px'
  },
  text: {
    fontFamily: Theme.font.family.regular,
    color: Theme.colors.grey400
  }
}

const NotFound = () => (
  <div style={styles.container}>
    <Error style={styles.icon} />
    <h3 style={styles.text}>Page does not exist!</h3>
  </div>
)

export default NotFound
