import express from 'express';

import * as userController from '../controllers/users.controller';
import * as authController from '../controllers/auth.controller';
import * as userValidator from '../middlewares/users.middleware';

let userService = {};
let authService = {};
export const router = express.Router();


router.get('/oauth2/authorize', authController.isAuthenticated, authController.authorization);

router.post('/oauth2/authorize', authController.isAuthenticated, authController.decision);

router.post('oauth2/token', authController.isClientAuthenticated, authController.token);

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
  userValidator.setDependencies(userService);
  authController.setDependencies(userService, newClientService, authService);
  // authValidator.setDependencies(authService);
}

