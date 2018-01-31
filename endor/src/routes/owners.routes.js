import express from 'express';

import * as ownersController from './../controllers/owners.controller';
import * as authController from './../controllers/auth.controller';
import * as projectAuth from './../authorization/projects.authorization';

export const router = express.Router();

// the project service
let projectService = {};

/**
 * @api {get} /projects/:projectId/owners Get owners for a project
 * @apiVersion 1.0.0
 * @apiName get owners
 * @apiGroup Owners
 *
 * @apiPermission none
 *
 * @apiHeader Authorization Basic Auth-Token
 * @apiParam {String} projectId the id of the project to get owners for
 *
 * @apiSuccess {Object[]} owners of the project
 * @apiSuccessExample {json} Success-Response
 * [
 {
     "id": 1,
     "username": "BobSagat",
     "email": "Bob@AFV.com",
     "firstName": "Bob",
     "lastName": "Sagat",
     "createdAt": "2017-11-12T20:26:47.000Z",
     "updatedAt": "2017-11-12T20:26:47.000Z",
     "projectOwner": {
         "createdAt": "2017-11-12T20:26:47.000Z",
         "updatedAt": "2017-11-12T20:26:47.000Z",
         "projectId": 1,
         "userId": 1
     }
 }
 ]
 */
router.get('/projects/:projectId/owners', authController.isAuthenticated, ownersController.getOwnersByProjectId);

/**
 * @api {get} /projects/:projectId/owners/:user Check if a user is a owner
 * @apiVersion 1.0.0
 * @apiName check if project is owner
 * @apiGroup Owners
 *
 * @apiPermission none
 *
 * @apiHeader Authorization Basic Auth-Token
 * @apiParam {String} id the id of the project
 * @apiParam {String} user user id or username
 *
 * @apiSuccessExample {json} Success-Response
 * Status: 204 No Content
 *
 * @apiErrorExample {json} Error-Response
 * Status: 404 Not Found
 */
router.get('/projects/:projectId/owners/:user', authController.isAuthenticated, ownersController.checkIfUserIsOwner);

/**
 * @api {post} /projects/:projectId/owners/:user Add owner to project
 * @apiVersion 1.0.0
 * @apiName add owner to project
 * @apiGroup Owners
 *
 * @apiPermission Project owner
 *
 * @apiHeader Authorization Basic Auth-Token
 * @apiParam {String} projectId The id of the project.
 * @apiParam {String} user User id or username of the user to add as an owner.
 *
 * @apiSuccess {Object[]} owners the owners of the project which the user was added to
 * @apiSuccessExample {json} Success-Response
 * [
 {
  "id": 1,
  "username": "BobSagat",
  "email": "Bob@AFV.com",
  "firstName": "Bob",
  "lastName": "Sagat",
  "createdAt": "2017-11-12T20:26:47.000Z",
  "updatedAt": "2017-11-12T20:26:47.000Z",
  "projectOwner": {
      "createdAt": "2017-11-12T20:26:47.000Z",
      "updatedAt": "2017-11-12T20:26:47.000Z",
      "projectId": 1,
      "userId": 1
  }
 }
 ]
 */
router.post(
  '/projects/:projectId/owners/:user',
  authController.isAuthenticated,
  projectAuth.ownerLevelAuthorization,
  ownersController.addOwnerToProject
);

/**
 * @api {delete} /projects/:projectId/owners/:user Remove owner from project
 * @apiVersion 1.0.0
 * @apiName remove owner from project
 * @apiGroup Owners
 *
 * @apiPermission Project owner
 *
 * @apiHeader Authorization Basic Auth-Token
 * @apiParam {String} projectId The id of the project.
 * @apiParam {String} user User id or username of the user to add as an owner.
 *
 * @apiSuccessExample {json} Success-Response
 * Status: 204 No Content
 */
router.delete(
  '/projects/:projectId/owners/:user',
  authController.isAuthenticated,
  projectAuth.ownerLevelAuthorization,
  ownersController.deleteOwnerFromProject
);

/**
 * Set dependencies for the owners routes
 * @param newProjectService the project service dependency
 */
export function setDependencies(newProjectService) {
  projectService = newProjectService;
  ownersController.setProjectService(projectService);
  projectAuth.setDependencies(projectService);
}

