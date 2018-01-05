import express from 'express';

import * as clientController from './../controllers/client.controller';
import * as authController from './../controllers/auth.controller';

export const router = express.Router();
let clientService = {};
/**
 * POST a new client
 *
 * Takes in the userId of the user and the client object. Then stores the client
 * in the database.
 * Example body:
 * {
 *   "client": {
 *   "name": "endor_frontend",
 *     "client_id": "client_id",
 *     "secret": "client_secret",
 *     "userId": 3,
 *    }
 *  }
 *
 *  Result on success:
 * {
 *   "id": 1,
 *   "name": "endor_frontend",
 *   "client_id": "client_id",
 *   "secret": "client_secret",
 *   "updatedAt": "2017-12-02T19:40:27.574Z",
 *   "createdAt": "2017-12-02T19:40:27.563Z",
 *   "userId": 3
 * }
 */
router.post('/clients', authController.isAuthenticated, clientController.createClient);

/**
 * GET all clients for given user
 *
 * Returns all the clients for the given user.  If the user has no clients, it will
 * result in a 404 error with a message saying they have no clients
 *
 * Result on success:
 * {
 *   "clients": [
 *       {
 *           "id": 1,
 *           "client_id": "client_id",
 *           "name": "endor_frontend",
 *           "secret": "client_secret",
 *           "createdAt": "2017-12-02T19:40:27.000Z",
 *           "updatedAt": "2017-12-02T19:40:27.000Z",
 *           "userId": 3
 *       }
 *   ]
 * }
 */
router.get('/clients/:userId', authController.isAuthenticated, clientController.getAllClients);

export function setDependencies(newUserService, newClientService, newAuthService) {
  clientService = newClientService;
  clientController.setDependencies(clientService);
  authController.setDependencies(newUserService, newClientService, newAuthService);
  // TODO - validation
  // clientValidator.setDependencies(clientService);
}
