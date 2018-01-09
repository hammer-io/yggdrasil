import { check } from 'express-validator/check';

/* eslint-disable import/prefer-default-export */
export function checkClient() {
  return [
    check('client.name')
      .exists()
      .isLength({ min: 1 })
      .matches(/^[a-zA-Z _0-9]*$/)
      .withMessage('Client Name is required. Must be alphanumeric with optional spaces and underscores.'),
    check('client.clientId')
      .exists()
      .isLength({ min: 8 })
      .matches(/^[a-zA-Z _0-9]*$/)
      .withMessage('ClientId is required. Must be alphanumeric with optional spaces and underscores. Minimum length is 8 characters'),
    check('client.secret')
      .exists()
      .isLength({ min: 8 })
      .matches(/\d/) // Checks for one number
      .matches(/[a-zA-Z]/) // Checks for one letter
      .withMessage('Passwords must be at least 8 characters long and contain a number and a letter.'),
    check('client.userId').exists().isNumeric().withMessage('Client must be tied to a user')
  ];
}
