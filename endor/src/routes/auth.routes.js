import express from 'express';

import * as userController from '../controllers/users.controller';
import * as authController from '../controllers/auth.controller';
import * as authValidator from '../middlewares/auth.middleware';

let userService = {};
let authService = {};
export const router = express.Router();


/**
 * @api { get } /oauth2/authorize Get permissions
 * @apiVersion 1.0.0
 * @apiName Get Authorization Data
 * @apiGroup Auth
 *
 * @apiPermission None
 *
 * @apiDescription Here the client is asking permission to use the user's account.
 * The response of the user should be sent to POST /oauth/authorize
 * This endpoint will return the client, the user and a transaction ID
 *
 * @apiHeader Authorization Basic Client-Basic Auth-Token
 * @apiParam { STRING } clientId the id of the client requesting access
 * @apiParam { STRING } response_type value should be 'code'
 * @apiParam { STRING } redirect_uri uri of redirect upon permission granted, which is the endpoint
 *     requesting access to the user's account
 *
 * @apiSuccess { json } returns a transaction id, user, and a client
 * @apiSucccessExample { json } Success-Example:
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
 *       "clientId": "clientId",
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
 * @api { post } /oauth2/authorize Post permissions authorized by the user
 * @apiVersion 1.0.0
 * @apiName Post permission
 * @apiGroup Auth
 *
 * @apiPermissions None
 *
 * @apiDescription Upon success, it redirects to the redirect_URI given to GET /oauth2/authorize.
 * To return a simple JSON indicating { success: true }, redirect to
 * GET /oauth2/authorize/successRedirect. Sends the code in req.query.code to the
 * redirectURI.
 *
 * @apiHeader Authorization Basic Client-Basic Auth-Token
 * @apiParam { STRING } transaction_id from GET /oauth2/authorize
 * @apiParamExample { json } Success-Example:
 * {
 *    "transaction_id": "3dI123d",
 *    "allow": true OR "deny":true
 * }
 *
 * @apiSuccess { json } returns success
 * @apiSuccessExample { json } Success-Example:
 * {
 *   "success": true
 * }
 */
router.post('/oauth2/authorize', [authController.isAuthenticated].concat(authValidator.checkAuthorize()), authController.decision());


/**
 * @api { post } /oauth2/token Exchange access code to create a token
 * @apiVersion 1.0.0
 * @apiName Post Token
 * @apiGroup Auth
 *
 * @apiPermission None
 *
 * @apiDescription The access token is deleted if the redirectURI and the access codes' client id is
 * the same as the client requesting the new token, and then the new token is created and returned
 * to in the response. The Authentication at this endpoint should be client authentication so as
 * to verify that this is the client's token
 *
 * @apiHeader Authorization Client-Basic
 * @apiParam { STRING } code the access code
 * @apiParam { STRING } grant_type the value should be "authorization_code"
 * @apiParam { STRING } redirect_uri the value should be "http://localhost:3000/api/v1/oauth2/authorize/successRedirect"
 * @apiParamExample Param-Example:
 * {
 *   "code": "YxTKMd9l8ZAvof2GEwiP6w",
 *   "grant_type": "authorization_code",
 *   "redirect_uri": "http://localhost:3000/api/v1/oauth2/authorize/successRedirect"
 * }
 *
 * @apiSuccess { json } returns the access token and the token_type ("bearer")
 * @apiSuccessExample { json } Success-Example:
 * {
 *   "access_token": {
 *       "id": 1,
 *       "value": "<Long String>"
 *       "userId": 3,
 *       "updatedAt": "2017-12-04T01:08:36.415Z",
 *       "createdAt": "2017-12-04T01:08:36.415Z"
 *   },
 *   "token_type": "Bearer"
 * }
 */
router.post('/oauth2/token', [authController.isClientAuthenticated].concat(authValidator.checkToken()), authController.token());

/**
 * @api { get } /oauth2/authorize/successRedirect Get access code redirect
 * @apiVersion 1.0.0
 * @apiName Authorize Redirect
 *
 * @apiPermission None
 *
 * @apiHeader Authorization Basic Client-Basic Auth-Token
 * @apiParam { STRING } code the access code in query.code
 *
 * @apiSuccess { json } code returns the access code
 * @apiSuccessExample { json } Success-Example:
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
}

