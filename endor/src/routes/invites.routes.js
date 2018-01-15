import express from 'express';

import * as contributorInvitationsController from './../controllers/contributor-invitations.controller';

export const router = express.Router();

// the project service
let projectService = {};

/**
 * @api {get} /projects/:id/contributors Get contributor invitations for a project (open and closed)
 * @apiVersion 1.0.0
 * @apiName get contributor invitations
 * @apiGroup Contributor Invitations
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
router.get('/projects/:id/contributors', contributorInvitationsController.getContributorsByProjectId);

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
router.get('/projects/:id/contributors/:user', contributorInvitationsController.checkIfUserIsContributor);

/**
 * @api {post} /projects/:id/contributors/:user Add contributor to project
 * @apiVersion 1.0.0
 * @apiName add contributor to project
 * @apiGroup Contributors
 *
 * @apiPermission project owner
 *
 * @apiParam {String} id the id of the project
 * @apiParam {String} user user id or username of the user to add as a contributor
 *
 * @apiSuccess {Object[]} contributors the contributors of the project which the user was added to
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
router.post('/projects/:id/contributors/:user', contributorInvitationsController.addContributorToProject);

/**
 * @api {delete} /projects/:id/contributors/:user Remove contributor from project
 * @apiVersion 1.0.0
 * @apiName remove contributor from project
 * @apiGroup Contributors
 *
 * @apiPermission project owner
 *
 * @apiParam {String} id the id of the project
 * @apiParam {String} user user id or username of the user to add as a contributor
 *
 * @apiSuccessExample {json} Success-Response
 * Status: 204 No Content
 */
router.delete('/projects/:id/contributors/:user', contributorInvitationsController.deleteContributorFromProject);

/**
 * Set dependencies for the contributors routes
 * @param newProjectService the project service dependency
 */
export function setDependencies(newProjectService) {
  projectService = newProjectService;
  contributorInvitationsController.setProjectService(projectService);
}

