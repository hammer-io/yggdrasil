import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import { TextField, Paper } from 'material-ui'
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
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Theme.padding.regular
  },
  button: {
    marginTop: Theme.padding.large
  }
}

class Register extends Component {
  render() {
    return (
      <div style={styles.container}>
        <Paper style={styles.form}>
          <h4 style={styles.header}>Create an account</h4>
          <TextField
            hintText="Email"
            floatingLabelText="Email"
          />
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
            label="Register"
            primary
            onClick={() => this.submitForm()}
            style={styles.button}
          />
        </Paper>
      </div>
    )
  }
}

export default withRouter(Register)
