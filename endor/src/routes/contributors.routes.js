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

export function setDependencies(newProjectService) {
  projectService = newProjectService;
  contributorsController.setProjectService(projectService);
}
