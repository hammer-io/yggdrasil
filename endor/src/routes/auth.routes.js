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
 * @apiHeader Authorization Basic Auth-Token
 * @apiParam { STRING } clientId the id of the client requesting access
 * @apiParam { STRING } response_type value should be 'code'
 * @apiParam { STRING } redirect_uri uri of redirect upon permission granted, which is the endpoint
 *     requesting access to the user's account
 *
 * @apiSuccess { json } returns a transaction id, user, and a client
 * @apiSuccessExample { json } Success-Example:
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
 * @apiPermission None
 *
 * @apiDescription Upon success, it redirects to the redirect_URI given to GET /oauth2/authorize.
 * To return a simple JSON indicating { success: true }, redirect to
 * GET /oauth2/authorize/successRedirect. Sends the code in req.query.code to the
 * redirectURI.
 *
 * @apiHeader Authorization Basic Auth-Token
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
 * @apiHeader Authorization Basic Auth-Token
 * @apiParam { STRING } code the access code if grant_type = authorization_code
 * @apiParam { STRING } username the username if grant_type = password
 * @apiParam { STRING } password the corresponding password if grant_type = password
 * @apiParam { STRING } grant_type the value should be "authorization_code" or "password"
 * @apiParamExample Param-Example:
 * {
 *   "code": "YxTKMd9l8ZAvof2GEwiP6w",
 *   "grant_type": "authorization_code"
 * }
 * @apiParamExample Param-Example:
 * {
 *   "username": "jreach",
 *   "password": "password_of_jreach",
 *   "grant_type": "password"
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
router.post('/oauth2/token', authValidator.checkToken(), authController.token());

/**
 * @api { get } /oauth2/authorize/successRedirect Get access code redirect
 * @apiVersion 1.0.0
 * @apiName Authorize Redirect
 * @apiGroup Auth
 *
 * @apiPermission None
 *
 * @apiHeader Authorization Basic Auth-Token
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
 * @api { post } /auth/register Register a new user
 * @apiVersion 1.0.0
 * @apiName Register User
 * @apiGroup Auth
 *
 * @apiPermission None
 *
 * @apiHeader Authorization Basic Auth-Token
 * @apiParam { STRING } username the new user's desired username
 * @apiParam { STRING } password the new user's desired password
 *
 * @apiSuccess { json } returns the new user and corresponding token
 * @apiSuccessExample { json } Success-Example:
 * {
 *  "user": {
 *       "id": 10,
 *       "username": "jreach6",
 *       "updatedAt": "2018-01-22T02:02:12.447Z",
 *       "createdAt": "2018-01-22T02:02:12.447Z"
 *   },
 *   "token": {
 *       "expired": false,
 *       "id": 12,
 *       "value": "<a really long token value here>"
 *       "userId": 10,
 *       "updatedAt": "2018-01-22T02:02:12.473Z",
 *       "createdAt": "2018-01-22T02:02:12.473Z"
 *   }
 * }
 *
 */
router.post('/auth/register', authValidator.checkToken(), authController.register);

/**
 * @api { get } /auth/token Check Authentication Token
 * @apiVersion 1.0.0
 * @apiName Check Auth Token
 * @apiGroup Auth
 *
 * @apiDescription Ensures that the token provided in the Authenitcation header is valid
 * and non expired.
 *
 * @apiHeader Authorization Auth-Token
 *
 * @apiSuccess status 200
 */
router.get('/auth/token', authController.isBearerAuthenticated, authController.checkToken);

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

