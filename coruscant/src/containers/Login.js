import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { TextField, RaisedButton, Paper } from 'material-ui'
import Theme from '../../style/theme'
import { login } from '../actions/session'
import * as validator from './../utils/validator'

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
    marginTop: Theme.padding.large,
    marginBottom: Theme.padding.small
  }
}

const mapDispatchToProps = {
  login
}

@connect(null, mapDispatchToProps)
class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      usernameErrorText: '',
      password: '',
      passwordErrorText: ''
    }

    this.submitForm = this.submitForm.bind(this)
    this.usernameOnChange = this.usernameOnChange.bind(this)
    this.passwordOnChange = this.passwordOnChange.bind(this)
  }

  async submitForm() {
    const { username, password } = this.state
    const { history, login } = this.props

    const validUsername = validator.validateUsername(username)
    if (typeof validUsername === 'string') {
      this.setState({ usernameErrorText: validUsername })
      return
    }

    const validPassword = validator.validatePassword(password)
    if (typeof validPassword === 'string') {
      this.setState({ passwordErrorText: validPassword })
      return
    }

    const credentials = {
      username,
      password
    }
    const { error } = await login(credentials)
    if (error) {
      console.log(error)
      return
    }

    if (history.action === 'PUSH') {
      history.goBack()
    } else {
      history.push('/home')
    }
  }

  usernameOnChange(event, newValue) {
    this.setState({ username: newValue })
    this.setState({ usernameErrorText: '' })
  }

  passwordOnChange(event, newValue) {
    this.setState({ password: newValue })
    this.setState({ passwordErrorText: '' })
  }

  render() {
    return (
      <div style={styles.container}>
        <Paper style={styles.form}>
          <h4 style={styles.header}>Sign in to Hammer-io</h4>
          <TextField
            hintText="Username"
            floatingLabelText="Username"
            errorText={this.state.usernameErrorText}
            onChange={this.usernameOnChange}
          />
          <TextField
            type="password"
            hintText="Password"
            floatingLabelText="Password"
            errorText={this.state.passwordErrorText}
            onChange={this.passwordOnChange}
          />
          <RaisedButton
            label="Sign in"
            primary
            onClick={() => this.submitForm()}
            style={styles.button}
          />
          <NavLink to="/register">Not a user?</NavLink>
        </Paper>
      </div>
    )
  }
}

export default withRouter(Login)