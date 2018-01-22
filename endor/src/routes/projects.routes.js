/* eslint-disable prefer-destructuring */

/**
 * The project routes. Maps any endpoint dealing with projects to their respective middleware
 * and controllers.
 */

import express from 'express';
import * as authController from '../controllers/auth.controller';
import * as projectController from '../controllers/projects.controller';
import * as projectValidator from '../middlewares/projects.middleware';

export const router = express.Router();

// the project service
let projectService = {};

/**
 * @api {get} /projects Get all public projects
 * @apiVersion 1.0.0
 * @apiName projects
 * @apiGroup Projects
 *
 * @apiPermission none
 *
 * @apiHeader Authorization Basic Client-Basic Auth-Token
 *
 * @apiSuccess {Object[]} projects List of all of the public projects
 * @apiSuccessExample {json} Success-Response:
 * [
 *  {
 *    "id": 1,
 *    "projectName": "TMNT",
 *    "description": "You gotta know what a crumpet is to understand cricket!",
 *    "version": "1.2.3",
 *    "license": "MIT",
 *    "authors": "Casey Jones, Raphael",
 *    "createdAt": "2017-11-12T17:08:30.000Z",
 *    "updatedAt": "2017-11-12T17:08:30.000Z",
 *    "containerizationToolId": null,
 *    "continuousIntegrationToolId": 1,
 *    "deploymentToolId": 3,
 *    "webFrameworkId": null
 *  }
 * ]
 */
router.get('/projects', authController.isAuthenticated, projectController.getAllProjects);

/**
 * @api {get} /user/projects Get projects for an authenticated user
 * @apiVersion 1.0.0
 * @apiName user projects
 * @apiGroup Projects
 *
 * @apiPermission authenticated user
 *
 * @apiHeader Authorization Basic Client-Basic Auth-Token
 *
 * @apiSuccess {Object[]} projects list of projects for authenticated user
 * @apiSuccessExample {json} Success-Response:
 {
     "owned": [
         {
             "id": 1,
             "projectName": "TMNT",
             "description": "You gotta know what a crumpet is to understand cricket!",
             "version": "1.2.3",
             "license": "MIT",
             "authors": "Casey Jones, Raphael",
             "createdAt": "2017-11-12T17:08:30.000Z",
             "updatedAt": "2017-11-12T17:08:30.000Z",
             "containerizationToolId": null,
             "continuousIntegrationToolId": 1,
             "deploymentToolId": 3,
             "webFrameworkId": null,
             "projectOwner": {
                 "createdAt": "2017-11-12T17:08:30.000Z",
                 "updatedAt": "2017-11-12T17:08:30.000Z",
                 "projectId": 1,
                 "userId": 3
             }
         }
     ],
     "contributed": [
         {
             "id": 1,
             "projectName": "TMNT",
             "description": "You gotta know what a crumpet is to understand cricket!",
             "version": "1.2.3",
             "license": "MIT",
             "authors": "Casey Jones, Raphael",
             "createdAt": "2017-11-12T17:08:30.000Z",
             "updatedAt": "2017-11-12T17:08:30.000Z",
             "containerizationToolId": null,
             "continuousIntegrationToolId": 1,
             "deploymentToolId": 3,
             "webFrameworkId": null,
             "projectContributor": {
                 "createdAt": "2017-11-12T17:08:30.000Z",
                 "updatedAt": "2017-11-12T17:08:30.000Z",
                 "projectId": 1,
                 "userId": 3
             }
         }
     ]
 }
 */
router.get('/user/projects', authController.isAuthenticated, projectController.getProjectByAuthenticatedUser);

/**
 * @api {get} /users/:user/projects Get a project by user id
 * @apiVersion 1.0.0
 * @apiName get projects for user
 * @apiGroup Projects
 *
 * @apiHeader Authorization Basic Client-Basic Auth-Token
 * @apiParam {String} user the user id or the username to find by
 *
 * @apiSuccess {[Object]} projects the list of projects for a given user
 * @apiSuccessExample {json} Success-Response:
 {
     "owned": [
         {
             "id": 1,
             "projectName": "TMNT",
             "description": "You gotta know what a crumpet is to understand cricket!",
             "version": "1.2.3",
             "license": "MIT",
             "authors": "Casey Jones, Raphael",
             "createdAt": "2017-11-12T17:08:30.000Z",
             "updatedAt": "2017-11-12T17:08:30.000Z",
             "containerizationToolId": null,
             "continuousIntegrationToolId": 1,
             "deploymentToolId": 3,
             "webFrameworkId": null,
             "projectOwner": {
                 "createdAt": "2017-11-12T17:08:30.000Z",
                 "updatedAt": "2017-11-12T17:08:30.000Z",
                 "projectId": 1,
                 "userId": 3
             }
         }
     ],
     "contributed": [
         {
             "id": 1,
             "projectName": "TMNT",
             "description": "You gotta know what a crumpet is to understand cricket!",
             "version": "1.2.3",
             "license": "MIT",
             "authors": "Casey Jones, Raphael",
             "createdAt": "2017-11-12T17:08:30.000Z",
             "updatedAt": "2017-11-12T17:08:30.000Z",
             "containerizationToolId": null,
             "continuousIntegrationToolId": 1,
             "deploymentToolId": 3,
             "webFrameworkId": null,
             "projectContributor": {
                 "createdAt": "2017-11-12T17:08:30.000Z",
                 "updatedAt": "2017-11-12T17:08:30.000Z",
                 "projectId": 1,
                 "userId": 3
             }
         }
     ]
 }
 */
router.get('/users/:user/projects', authController.isAuthenticated, projectController.getProjectsByUser);

/**
 * @api {get} /projects/:projectId Get project by id
 * @apiVersion 1.0.0
 * @apiName get project by id
 * @apiGroup Projects
 *
 * @apiPermission autenticated user
 *
 * @apiHeader Authorization Basic Client-Basic Auth-Token
 * @apiParam {String} projectId the projectId to find by
 *
 * @apiSuccess {Object} project the project
 * @apiSuccessExample {json} Success-Response:
 *  {
 *    "id": 1,
 *    "projectName": "TMNT",
 *    "description": "You gotta know what a crumpet is to understand cricket!",
 *    "version": "1.2.3",
 *    "license": "MIT",
 *    "authors": "Casey Jones, Raphael",
 *    "createdAt": "2017-11-12T17:08:30.000Z",
 *    "updatedAt": "2017-11-12T17:08:30.000Z",
 *    "containerizationToolId": null,
 *    "continuousIntegrationToolId": 1,
 *    "deploymentToolId": 3,
 *    "webFrameworkId": null
 *  }
 */
router.get('/projects/:projectId', authController.isAuthenticated, projectController.getProjectById);

/**
 * @api {post} /user/projects Create a project for an authenticated user
 * @apiVersion 1.0.0
 * @apiName post project for authenticated user
 * @apiGroup Projects
 *
 * @apiPermission authenticated user
 *
 * @apiHeader Authorization Basic Client-Basic Auth-Token
 * @apiParam {String} projectName the name of the project
 * @apiParam {String} description the description to the project
 * @apiParam {String} version the version of the project
 * @apiParam {String} license the name of the license
 * @apiParam {[String]} authors a string of comma separated values
 * @apiParam {String} containerizationTool the name of the containerization tool or <None>
 * @apiParam {String} continuousIntegrationTool the name of the continuous integration tool or
 * <None>
 * @apiParam {String} deploymentTool the name of the deployment tool or <None>
 * @apiParam {String} webFramework the name of the web framework or <None>
 *
 * @apiParamExample {json} Request Example:
 * {
 *  "projectName": "hammer-io",
 *  "description": "Hit it with a Hammer!",
 *  "version": "0.0.1",
 *  "license": "MIT",
 *  "authors": "Holmgang, Jack",
 *  "containerizationTool": "2",
 *  "continuousIntegrationTool": "1",
 *  "deploymentTool": "3",
 *  "webFramework": "4"
 * }
 *
 *
 * @apiSuccess {Object} project the created project
 * @apiSuccessExample {json} Success-Response:
 *  {
 *    "id": 1,
 *    "projectName": "hammer-io",
 *    "description": "Hit it with a Hammer!",
 *    "version": "0.0.1",
 *    "license": "MIT",
 *    "authors": "Holmgang, Jack",
 *    "createdAt": "2017-11-12T17:08:30.000Z",
 *    "updatedAt": "2017-11-12T17:08:30.000Z",
 *    "containerizationToolId": 2,
 *    "continuousIntegrationToolId": 1,
 *    "deploymentToolId": 3,
 *    "webFrameworkId": 4
 *  }
 */
router.post(
  '/user/projects',
  [authController.isAuthenticated].concat(projectValidator.checkCreateProject()),
  projectController.createProjectForAuthenticatedUser
);

/**
 * @api {post} /users/:user/projects Create a project
 * @apiVersion 1.0.0
 * @apiName post project for user
 * @apiGroup Projects
 *
 * @apiPermission authenticated user
 *
 * @apiHeader Authorization Basic Client-Basic Auth-Token
 * @apiParam {String} user the username or userid of the user to create a project for
 * @apiParam {String} projectName the name of the project
 * @apiParam {String} description the description to the project
 * @apiParam {String} version the version of the project
 * @apiParam {String} license the name of the license
 * @apiParam {[String]} authors a string of comma separated values
 * @apiParam {String} containerizationTool the name of the containerization tool or <None>
 * @apiParam {String} continuousIntegrationTool the name of the continuous integration tool or
 * <None>
 * @apiParam {String} deploymentTool the name of the deployment tool or <None>
 * @apiParam {String} webFramework the name of the web framework or <None>
 *
 * @apiParamExample {json} Request Example:
 * {
 *  "projectName": "hammer-io",
 *  "description": "Hit it with a Hammer!",
 *  "version": "0.0.1",
 *  "license": "MIT",
 *  "authors": "Holmgang, Jack",
 *  "containerizationTool": "2",
 *  "continuousIntegrationTool": "1",
 *  "deploymentTool": "3",
 *  "webFramework": "4"
 * }
 *
 *
 * @apiSuccess {Object} project the created project
 * @apiSuccessExample {json} Success-Response:
 *  {
 *    "id": 1,
 *    "projectName": "hammer-io",
 *    "description": "Hit it with a Hammer!",
 *    "version": "0.0.1",
 *    "license": "MIT",
 *    "authors": "Holmgang",
 *    "createdAt": "2017-11-12T17:08:30.000Z",
 *    "updatedAt": "2017-11-12T17:08:30.000Z",
 *    "containerizationToolId": 2,
 *    "continuousIntegrationToolId": 1,
 *    "deploymentToolId": 3,
 *    "webFrameworkId": 4
 *  }
 */
router.post(
  '/users/:user/projects',
  [authController.isAuthenticated].concat(projectValidator.checkCreateProject()),
  projectController.createProjectForUser
);

/**
 * @api {patch} /projects/:id Update a project
 * @apiVersion 1.0.0
 * @apiName patch project
 * @apiGroup Projects
 *
 * @apiPermission project owner
 *
 * @apiHeader Authorization Basic Auth-Token
 * @apiParam {String} id the id of the project to update
 *
 * @apiSuccess {Object} project the updated project
 * @apiSuccessExample {json} Success-Response:
 *  {
 *    "id": 1,
 *    "projectName": "TMNT",
 *    "description": "You gotta know what a crumpet is to understand cricket!",
 *    "version": "1.2.3",
 *    "license": "MIT",
 *    "authors": "Casey Jones, Raphael",
 *    "createdAt": "2017-11-12T17:08:30.000Z",
 *    "updatedAt": "2017-11-12T17:08:30.000Z",
 *    "containerizationToolId": null,
 *    "continuousIntegrationToolId": 1,
 *    "deploymentToolId": 3,
 *    "webFrameworkId": null
 *  }
 */
router.patch(
  '/projects/:id',
  [authController.isAuthenticated].concat(projectValidator.checkUpdateProject()),
  projectController.updateProjectById
);

/**
 * @api {delete} /projects/:id Delete a project
 * @apiVersion 1.0.0
 * @apiName delete project
 * @apiGroup Projects
 *
 * @apiHeader Authorization Basic Auth-Token
 * @apiPermission project owner
 *
 * @apiSuccess {Object} project the deleted project
 * @apiSuccessExample {json} Success-Response
 * Status: 204 No Content
 */
router.delete('/projects/:id', authController.isAuthenticated, projectController.deleteProjectById);

/**
 * Sets the project service dependency for the controller
 * @param newProjectService the project service dependency
 */
export function setProjectService(newProjectService) {
  projectService = newProjectService;
  projectController.setProjectService(projectService)
}
