import React from 'react'
import Spinner from './Spinner'

const styles = {
  spinnerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 48
  },
}

const BasicSpinner = () => (
  <div style={styles.spinnerContainer}>
    <Spinner />
  </div>
)

export default BasicSpinner
