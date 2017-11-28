import express from 'express';

import * as clientController from './../controllers/client.controller';
import * as authController from './../controllers/auth.controller';

export const router = express.Router();
let clientService = {};

router.post('/clients', authController.isAuthenticated, clientController.createClient);

router.get('/clients', authController.isAuthenticated, clientController.getAllClients);

export function setDependencies(newUserService, newClientService, newAuthService) {
  clientService = newClientService;
  clientController.setDependencies(clientService);
  authController.setDependencies(newUserService, newClientService, newAuthService);
  // TODO - validation
  // clientValidator.setDependencies(clientService);
}
