/* eslint-disable import/prefer-default-export */
import RequestParamError from '../error/RequestParamError';

/**
 * Formats an error to the proper format
 * @param error an error in the format { location, msg, param, value, nestedErrors } as defined
 * in the express-validator API.
 * @returns {RequestParamError} the error to return
 */
export function formatError(error) {
  return new RequestParamError(error.param, error.msg);
}
