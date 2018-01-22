import express from 'express';

import * as authController from './../controllers/auth.controller';
import * as clientController from './../controllers/client.controller';
import * as clientValidator from '../middlewares/client.middleware';


export const router = express.Router();
let clientService = {};
/**
 * @api {post} /clients Create a new client
 * @apiVersion 1.0.0
 * @apiName Create a new client
 * @apiGroup Clients
 *
 * @apiPermission none
 *
 * @apiHeader Authorization Basic Auth-Token
 * @apiParam { json } client client to be created
 * @apiParam { String } client.name name of the client
 * @apiParam { String } client.clientId clientId of the client. Must be unique
 * @apiParam { String } client.secret secret of the client
 * @apiParam { Integer } client.userId userId of the user who owns the client
 * @apiParamExample { json } Param-Example:
 * {
    "client": {
      "name": "endor_frontend",
      "clientId": "clientId",
      "secret": "client_secret",
      "userId": 3,
     }
   }
 * @apiSuccess { json } client the newly created client
 * @apiSuccessExample { json } Success-Example:
 * {
     "id": 1,
     "name": "endor_frontend",
     "clientId": "clientId",
     "secret": "client_secret",
     "updatedAt": "2017-12-02T19:40:27.574Z",
     "createdAt": "2017-12-02T19:40:27.563Z",
     "userId": 3
   }
 */
router.post('/clients', [authController.isAuthenticated].concat(clientValidator.checkClient()), clientController.createClient);

export function setDependencies(newUserService, newClientService, newAuthService) {
  clientService = newClientService;
  clientController.setDependencies(clientService);
  authController.setDependencies(newUserService, newClientService, newAuthService);
}
