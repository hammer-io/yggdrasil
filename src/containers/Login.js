import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { TextField, RaisedButton, Paper } from 'material-ui'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'
import Theme from '../../style/theme'
import { login, setPreviousRoute } from '../actions/session'
import * as validator from './../utils/validator'

const styles = {
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

const mapStateToProps = state => ({
  session: state.session
})

const mapDispatchToProps = {
  login,
  setPreviousRoute
}

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

  async submitForm(event) {
    // Prevents form submission from leaving the single-page app
    event.preventDefault()
    event.stopPropagation()

    const { username, password } = this.state
    const {
      session,
      history,
      login,
      setPreviousRoute
    } = this.props

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
      if (error.error.type === 'Invalid Credentials') {
        if (error.error.field === 'username') {
          this.setState({ usernameErrorText: error.error.message })
        } else if (error.error.field === 'password') {
          this.setState({ passwordErrorText: error.error.message })
        }
      }
      console.error(error)
      return
    }

    if (history.action === 'PUSH' && !['/register', '/home'].includes(session.previousRoute)) {
      // If the user didn't come from the registration page or landing page, send them back
      // to whatever they were originally trying to access
      setPreviousRoute('/login')
      history.goBack()
    } else {
      setPreviousRoute('/login')
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
      <DocumentTitle title="Login">
        <form style={styles.container} onSubmit={this.submitForm}>
          <Paper style={styles.form}>
            <h4>Sign in to Hammer-io</h4>
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
              type="submit"
              onClick={this.submitForm}
              style={styles.button}
            />
            <NavLink to="/register">Not a user?</NavLink>
          </Paper>
        </form>
      </DocumentTitle>
    )
  }
}

Login.propTypes = {
  session: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  setPreviousRoute: PropTypes.func.isRequired
}

const ExportedLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default withRouter(ExportedLogin)
