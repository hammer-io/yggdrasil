import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { TextField, RaisedButton, Paper } from 'material-ui'
import Theme from "../../style/theme.js"

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
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: Theme.padding.regular
  },
  button: {
    marginTop: Theme.padding.large
  }
}

class Login extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    return (
      <div style={styles.container}>
        <Paper style={styles.form}>
          <h4 style={styles.header}>Sign in to Hammer-io</h4>
          <TextField
            hintText="Username"
            floatingLabelText="Username"
          />
          <TextField
            type="password"
            hintText="Password"
            floatingLabelText="Password"
          />
          <RaisedButton
            label="Sign in"
            primary={true}
            onClick={() => this.submitForm()}
            style={styles.button}
          />
        </Paper>
      </div>
    )
  }
}

export default withRouter(Login)