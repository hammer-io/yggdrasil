import React from 'react'
import Theme from './../../style/theme'

const styles = {
  container: {
    marginTop: '20px',
    borderLeftWidth: '3px',
    borderLeftColor: Theme.colors.grey200,
    borderLeftStyle: 'solid',
    borderRadius: '5px'
  }
}

const Divider = () => (
  <div style={styles.container} />
)

export default Divider
