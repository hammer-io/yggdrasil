/* eslint-disable newline-per-chained-call */
import { InviteStatus } from '../db/sequelize';
import RequestParamError from '../error/RequestParamError';

const inviteStatusValues = Object.keys(InviteStatus).map(key => InviteStatus[key]);
const enumValues = inviteStatusValues.join(', ');

/**
 * @param value
 * @returns {boolean} true if the value is an integer AND is >= 0
 */
export function isNonNegativeInteger(value) {
  return Number.isInteger(value) && value >= 0;
}

/**
 * Throws a RequestParamError if the value is negative
 */
export function checkForNonNegativeInteger(req, res, next) {
  const value = req.body.daysFromCreationUntilExpiration;
  if (!isNonNegativeInteger(value)) {
    throw new RequestParamError('daysFromCreationUntilExpiration', 'Must be a non-negative integer.');
  }
  next();
}

/**
 * Returns true if the given status is a match to one of the possible enumerations
 * @param status the string to check
 * @returns {boolean} whether or not the string is a valid InviteStatus
 */
export function isValidInviteStatus(status) {
  return inviteStatusValues.filter(value => value === status).length > 0;
}

/**
 * @returns {string} an error message listing the possible valid status strings
 */
export function getInvalidStatusMessage() {
  return `The status must be set to one of the following values: ${enumValues}.`;
}
