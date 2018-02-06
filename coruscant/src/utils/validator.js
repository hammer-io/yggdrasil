import * as validator from 'email-validator'

const letterNumber = /^[0-9a-zA-Z_]+$/
const letter = /[a-zA-Z]/
const number = /\d/

/**
 * Determines if a string is blank or not
 * @param value the value to check
 * @returns {boolean} true if blank, false otherwise
 */
function isBlank(value) {
  return (typeof value === 'undefined') || value === '' || value.trim().length < 1
}

/**
 * Validates a username
 *
 * @param username The username to validate
 * @returns {*} if not valid, returns the error message. Otherwise, returns true
 */
export function validateUsername(username) {
  if (isBlank(username)) {
    return 'Username cannot be blank!'
  }

  if (username.length > 255) {
    return 'Username cannot be longer than 255 characters'
  }

  if (!username.match(letterNumber)) {
    return 'Username can contain only alphanumeric values and underscores'
  }

  return true
}

/**
 * Validates an email. An email is valid if it is not blank and is a valid email determined by the
 * email validator.
 *
 * @param email the email to validate
 * @returns {*} if not valid, returns the error message. Otherwise, returns true
 */
export function validateEmail(email) {
  if (isBlank(email)) {
    return 'Email cannot be blank!'
  } else if (!validator.validate(email)) {
    return 'Email must be a valid email!'
  }

  return true
}

/**
 * Validates a password
 * @param password the password to validate
 * @returns {*} if not valid, returns the error message. Otherwise, returns true
 */
export function validatePassword(password) {
  if (isBlank(password)) {
    return 'Password cannot be blank!'
  }

  if (password.length < 8) {
    return 'Password must be at least 8 characters long'
  }

  if (!password.match(letter)) {
    return 'Password must contain at least one letter'
  }

  if (!password.match(number)) {
    return 'Password must contain at least one digit'
  }

  return true
}
