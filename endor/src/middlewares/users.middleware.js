/* eslint-disable newline-per-chained-call */
import { check } from 'express-validator/check';

let userService = {};

function checkDuplicateUsername(value) {
  return userService.getUserByIdOrUsername(value).then((user) => {
    throw new Error(`User with username ${user.email} already exists.`);
  });
}

function checkDuplicateEmail(value) {
  return userService.getUserByEmail(value).then((user) => {
    throw new Error(`User with email ${user.email} already exists.`);
  });
}

/**
 * Middleware for the POST /users route
 * @returns {Array} the middlewares
 */
export function checkCreateUser() {
  return [
    check('username').exists().withMessage('Username is required.')
      .custom(value => checkDuplicateUsername(value)),
    check('email')
      .exists().withMessage('Email is required.')
      .isEmail().withMessage('Must be a valid email.')
      .custom(value => checkDuplicateEmail(value))
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
    check('username').custom(value => checkDuplicateUsername(value)),
    check('email')
      .isEmail().withMessage('Must be a valid email.')
      .custom(value => checkDuplicateEmail(value))
      .trim()
      .normalizeEmail(),
  ]
}

export function setDependencies(newUserService) {
  userService = newUserService;
}
