import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Theme from '../../style/theme'

const styles = {
  header: {
    fontFamily: Theme.font.family.regular
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Theme.padding.regular
  }
}

class Home extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    return (
      <div style={styles.container}>
        <h4 style={styles.header}>Welcome</h4>
      </div>
    )
  }
}

export default Home