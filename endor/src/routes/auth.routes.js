import express from 'express';

import * as userController from '../controllers/users.controller';
import * as authController from '../controllers/auth.controller';

let userService = {};
let authService = {};
export const router = express.Router();


/**
 * GET authorization data
 *
 * Params required:
 * client_id: the id of the client requesting access
 * response_type: value should be 'code'
 * redirect_uri: uri of redirect upon permission granted, which is the endpoint
 *     requestion access to the user's account
 *
 * Here the client is asking permission to use the user's account.
 * The response of the user should be sent to POST /oauth/authorize
 * This endpoint will return the client, the user and a transaction ID
 *
 * Result on success:
 * {
 *   "transactionID": "IRGn6Bom",
 *   "user": {
 *       "id": 3,
 *       "username": "jreach",
 *       "email": "jreach@gmail.com",
 *       "firstName": "Jack",
 *       "lastName": "Reacher",
 *       "createdAt": "2017-12-02T19:28:53.000Z",
 *       "updatedAt": "2017-12-02T19:28:53.000Z"
 *   },
 *   "client": {
 *       "id": 1,
 *       "client_id": "client_id",
 *       "name": "endor_frontend",
 *       "secret": "client_secret",
 *       "createdAt": "2017-12-02T19:40:27.000Z",
 *       "updatedAt": "2017-12-02T19:40:27.000Z",
 *       "userId": 3
 *   }
 * }
 */
router.get('/oauth2/authorize', authController.isAuthenticated, authController.authorization());

/**
 * POST response from user to the request from GET /oauth2/authorize
 *
 * Upon success, it redirects to the redirect_URI given to GET /oauth2/authorize.
 * To return a simple JSON indicating { success: true }, redirect to
 * GET /oauth2/authorize/successRedirect . Sends the code in the parameters to the
 * redirectURI.
 *
 * Requires:
 * {
 *    "transaction_id": "3dI123d", (transaction_id from GET /oauth2/authorize)
 *    "allow": true OR "deny":true
 * }
 */
router.post('/oauth2/authorize', authController.isAuthenticated, authController.decision());


/**
 * POST a token in exchange for an access code
 *
 * Request:
 * {
 *   "code": "YxTKMd9l8ZAvof2GEwiP6w",
 *   "grant_type": "authorization_code",
 *   "redirect_uri": "http://localhost:3000/api/v1/authorize/successRedirect"
 * }
 *
 * //TODO what will the response be?
 */
router.post('/oauth2/token', authController.isClientAuthenticated, authController.token());

/**
 * GET a json object containing the accesscode
 *
 * Returns:
 * {
 *     "code": "jk2q43jk2dsr4qqewfds_"
 * }
 */
router.get('/oauth2/authorize/successRedirect', authController.isAuthenticated, authController.success);

/**
 * Sets dependencies for the routes
 * @param newUserService the user service dependency
 * @param newClientService the client service dependency
 * @param newAuthService the auth service dependency
 */
export function setDependencies(newUserService, newClientService, newAuthService) {
  userService = newUserService;
  authService = newAuthService;
  userController.setDependencies(userService);
  authController.setDependencies(userService, newClientService, authService);
  // authValidator.setDependencies(authService);
}

