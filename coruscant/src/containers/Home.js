import React, {Component} from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import theme from "../../style/theme.js"

class Home extends Component {

  render() {
    return (
      <div style={theme.simplePadding}>
        <h4>Sign in to Hammer-io</h4>
        <TextField
          hintText="Username"
          floatingLabelText="Username"
        />
        <br/>
        <TextField
          type="password"
          hintText="Password"
          floatingLabelText="Password"
        />
        <br/>
        <RaisedButton
          label="Sign in"
          primary={true}
          onClick={() => this.submitForm()}
        />
      </div>
    )
  }
}

export default Home