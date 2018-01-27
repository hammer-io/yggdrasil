import express from 'express';
import * as authController from './../controllers/auth.controller';
import * as usersController from './../controllers/users.controller';
import * as userValidator from './../middlewares/users.middleware';

export const router = express.Router();
let userService = {};

/**
 * @api {get} /users Get all public users
 * @apiVersion 1.0.0
 * @apiName get users
 * @apiGroup Users
 *
 * @apiPermission none
 *
 * @apiHeader Authorization Basic Auth-Token
 *
 * @apiSuccess {Object[]} users List of all of the public users
 * @apiSuccessExample {json} Success-Response:
 * [
    {
     "id": 1,
     "username": "BobSagat",
     "email": "Bob@AFV.com",
     "firstName": "Bob",
     "lastName": "Sagat",
     "createdAt": "2017-11-12T20:26:47.000Z",
     "updatedAt": "2017-11-12T20:26:47.000Z"
    }
  ]
 */
router.get('/users', authController.isAuthenticated, usersController.getAllUsers);

/**
 * @api {get} /users/:user Get user by id or username
 * @apiVersion 1.0.0
 * @apiName get user by id or username
 * @apiGroup Users
 *
 * @apiPermission none
 *
 * @apiHeader Authorization Basic Auth-Token
 *
 * @apiSuccess {Object} users List of all of the public users
 * @apiSuccessExample {json} Success-Response:
 * {
    "id": 1,
    "username": "BobSagat",
    "email": "Bob@AFV.com",
    "firstName": "Bob",
    "lastName": "Sagat",
    "createdAt": "2017-11-12T20:26:47.000Z",
    "updatedAt": "2017-11-12T20:26:47.000Z"
  }
 */
router.get('/users/:user', authController.isAuthenticated, usersController.getUserByIdOrUsername);

/**
 * @api {get} /user Get authenticated user
 * @apiVersion 1.0.0
 * @apiName get authenticated user
 * @apiGroup Users
 *
 * @apiPermission authenticated user
 *
 * @apiHeader Authorization Basic Auth-Token
 *
 * @apiSuccess {Object} user Authenticated user information
 * @apiSuccessExample {json} Success-Response:
 * {
      "id": 1,
      "username": "BobSagat",
      "email": "Bob@AFV.com",
      "firstName": "Bob",
      "lastName": "Sagat",
      "createdAt": "2017-11-12T20:26:47.000Z",
      "updatedAt": "2017-11-12T20:26:47.000Z"
    }
 */
router.get('/user', authController.isAuthenticated, usersController.getAuthenticatedUser);

/**
 * @api {post} /users Create new user
 * @apiVersion 1.0.0
 * @apiName create user
 * @apiGroup Users
 *
 * @apiPermission authenticated user
 *
 * @apiParam {String} username the username of the user
 * @apiParam {String} email the email of the user
 * @apiParam {String} firstName the first name of the user
 * @apiParam {String} lastName the last name of the user
 *
 * @apiParamExample {json} Request-Example:
 * {
 *  "username": "BobSagat",
 *  "email": "Bob@AFV.com",
 *  "firstName": "Bob",
 *  "lastName": "Sagat",
 *  "password": "SuperSecurePassword1"
 * }
 *
 * @apiSuccess {json} user The user that was created
 * @apiSuccessExample {json} Success-Response:
 * {
      "id": 1,
      "username": "BobSagat",
      "email": "Bob@AFV.com",
      "firstName": "Bob",
      "lastName": "Sagat",
      "createdAt": "2017-11-12T20:26:47.000Z",
      "updatedAt": "2017-11-12T20:26:47.000Z"
    }
 */
router.post('/users', usersController.createUser);

/**
 * @api {patch} /users/:user update a user
 * @apiVersion 1.0.0
 * @apiName update user
 * @apiGroup Users
 *
 * @apiHeader Authorization Basic Auth-Token
 * @apiParam {String} id the id of the user to update
 * @apiParam {String} username the username of the user
 * @apiParam {String} email the email of the user
 * @apiParam {String} firstName the first name of the user
 * @apiParam {String} lastName the last name of the user
 *
 * @apiParamExample {json} Request-Example:
 * {
 *  "username": "BobSagat",
 *  "email": "Bob@AFV.net",
 *  "firstName": "Bob",
 *  "lastName": "Sagat"
 * }
 *
 * @apiSuccess {Object} user The updated user
 * @apiSuccessExample {json} Success-Response:
 * {
      "id": 1,
      "username": "BobSagat",
      "email": "Bob@AFV.net",
      "firstName": "Bob",
      "lastName": "Sagat",
      "createdAt": "2017-11-12T20:26:47.000Z",
      "updatedAt": "2017-11-14T20:26:47.000Z"
    }
 */
router.patch(
  '/users/:user',
  [authController.isAuthenticated].concat(userValidator.checkUpdateUser()),
  usersController.updateUserByIdOrUsername
);

/**
 * @api {delete} /users/:user delete a user
 * @apiVersion 1.0.0
 * @apiName delete user
 * @apiGroup Users
 *
 * @apiHeader Authorization Basic Auth-Token
 * @apiParam {String} id the id of the user to delete
 *
 * @apiSuccessExample {json} Success-Response
 * Status: 204 No Content
 */
router.delete('/users/:user', authController.isAuthenticated, usersController.deleteUserById);

/**
 * Sets dependencies for the routes
 * @param newUserService the user service dependency
 */
export function setDependencies(newUserService) {
  userService = newUserService;
  usersController.setDependencies(userService);
}
