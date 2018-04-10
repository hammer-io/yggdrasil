import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import { TextField, Paper } from 'material-ui'
import DocumentTitle from 'react-document-title'
import { register } from './../actions/session'
import * as validator from './../utils/validator'
import Theme from './../../style/theme'

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

const mapDispatchToProps = {
  register
}

class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      usernameErrorText: '',
      password: '',
      passwordErrorText: '',
      email: '',
      emailErrorText: ''
    }

    this.submitForm = this.submitForm.bind(this)
    this.emailOnChange = this.emailOnChange.bind(this)
    this.usernameOnChange = this.usernameOnChange.bind(this)
    this.passwordOnChange = this.passwordOnChange.bind(this)
  }

  async submitForm(event) {
    // Prevents form submission from leaving the single-page app
    event.preventDefault()
    event.stopPropagation()

    const { username, password, email } = this.state
    const { history, register } = this.props

    const validEmail = validator.validateEmail(email)
    if (typeof validEmail === 'string') {
      this.setState({ emailErrorText: validEmail })
      return
    }

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
      email,
      username,
      password
    }
    const { result, error } = await register(credentials)
    if (result) {
      history.push('/home')
    } else {
      if (error.error.type === 'Invalid Request') {
        error.error.errors.map((err) => {
          if (err.field === 'username') {
            this.setState({ usernameErrorText: err.message })
          } else if (err.field === 'password') {
            this.setState({ passwordErrorText: err.message })
          } else if (err.field === 'email') {
            this.setState({ emailErrorText: err.message })
          }
          return err
        })
      }
      console.error(error)
    }
  }

  emailOnChange(event, newValue) {
    this.setState({ email: newValue })
    this.setState({ emailErrorText: '' })
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
      <DocumentTitle title="Register">
        <form style={styles.container} onSubmit={this.submitForm}>
          <Paper style={styles.form}>
            <h4>Create an account</h4>
            <TextField
              hintText="Email"
              floatingLabelText="Email"
              errorText={this.state.emailErrorText}
              onChange={this.emailOnChange}
            />
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
              label="Register"
              primary
              type="submit"
              onClick={this.submitForm}
              style={styles.button}
            />
            <NavLink to="/login">Already a user?</NavLink>
          </Paper>
        </form>
      </DocumentTitle>
    )
  }
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

const ExportedRegister = connect(
  null,
  mapDispatchToProps
)(Register)

export default withRouter(ExportedRegister)
