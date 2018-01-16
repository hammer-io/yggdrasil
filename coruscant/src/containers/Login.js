import React, { Component } from 'react'
import { TextField, RaisedButton } from 'material-ui'
import theme from "../../style/theme.js"

const styles = {

}

class Login extends Component {

  render() {
    return (
      <div style={theme.simplePadding}>
        <h4>Sign in to Hammer-io</h4>
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
        />
      </div>
    )
  }
}

export default Login