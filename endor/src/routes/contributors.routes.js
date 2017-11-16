import express from 'express';

import * as contributorsController from './../controllers/contributors.controller';

export const router = express.Router();

// the project service
let projectService = {};

/**
 * @api {get} /projects/:id/contributors Get contributors for a project
 * @apiVersion 1.0.0
 * @apiName get contributors
 * @apiGroup Contributors
 *
 * @apiPermission none
 *
 * @apiParam {String} id the id of the project to get contributors for
 *
 * @apiSuccess {Object[]} contributors of the project
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
         "projectContributor": {
             "createdAt": "2017-11-12T20:26:47.000Z",
             "updatedAt": "2017-11-12T20:26:47.000Z",
             "projectId": 1,
             "userId": 1
         }
     }
    ]
 */
router.get('/projects/:id/contributors', contributorsController.getContributorsByProjectId);

/**
 * @api {get} /projects/:id/contributors/:user Check if a user is a contributor
 * @apiVersion 1.0.0
 * @apiName check if project is contributor
 * @apiGroup Contributors
 *
 * @apiPermission none
 *
 * @apiParam {String} id the id of the project
 * @apiParam {String} user user id or username
 *
 * @apiSuccessExample {json} Success-Response
 * Status: 204 No Content
 *
 * @apiErrorExample {json} Error-Response
 * Status: 404 Not Found
 */
router.get('/projects/:id/contributors/:user', contributorsController.checkIfUserIsContributor);

/**
 * Set dependencies for the contributors routes
 * @param newProjectService the project service dependency
 */
export function setDependencies(newProjectService) {
  projectService = newProjectService;
  contributorsController.setProjectService(projectService);
}
