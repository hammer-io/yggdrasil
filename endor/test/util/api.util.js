/* eslint-disable import/prefer-default-export */

export const API = '/api/v1';
/**
 * Returns the string used for the basic authorization.
 *
 * @param username the username
 * @param password the password
 * @returns {string} the basic authentication string
 */
export function basicAuthorization(username, password) {
  return `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;
}

/**
 * Returns the string used for the token authorization header\t
 *
 * @param token
 * @returns {string}
 */
export function tokenAuthorization(token) {
  return `token ${token}`;
}

/**
 * Returns the string used for the bearer authorization header\t
 *
 * @param token
 * @returns {string}
 */
export function bearerAuthorization(token) {
  return `Bearer ${token}`;
}

