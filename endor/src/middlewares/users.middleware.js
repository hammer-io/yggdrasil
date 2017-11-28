/* eslint-disable newline-per-chained-call */
import { check } from 'express-validator/check';


/**
 * Middleware for the POST /users route
 * @returns {Array} the middlewares
 */
export function checkCreateUser() {
  return [
    check('username').exists().withMessage('Username is required.'),
    check('email')
      .exists().withMessage('Email is required.')
      .isEmail().withMessage('Must be a valid email.')
      .trim()
      .normalizeEmail(),
    check('firstName').exists().withMessage('First Name is required.'),
    check('lastName').exists().withMessage('Last Name is required.')
  ]
}

/**
 * Middleware for the PATCH /users/:user route
 * @returns {Array} the middlewares
 */
export function checkUpdateUser() {
  return [
    check('username'),
    check('email')
      .isEmail().withMessage('Must be a valid email.')
      .trim()
      .normalizeEmail(),
  ]
}
