import express from 'express';

import * as invitesController from './../controllers/invites.controller';

export const router = express.Router();

/**
 * Set dependencies for the invites routes
 * @param inviteService the invite service dependency
 * @param userService the user service dependency
 * @param projectService the project service dependency
 */
export function setDependencies(inviteService, userService, projectService) {
  invitesController.setInviteService(inviteService);
  invitesController.setUserService(userService);
  invitesController.setProjectService(projectService);
}

/**
 * @api {get} /projects/:id/invites Get all contributor invitations for a project
 * @apiVersion 1.0.0
 * @apiName get invites
 * @apiGroup Invites
 *
 * @apiPermission project owner
 *
 * @apiParam {String} id the id of the project to get contributor invites to
 *
 * @apiSuccess {Object[]} contributor invites to the project
 * @apiSuccessExample {json} Success-Response
 * [
 {
  "id": 1,
  "status": "OPEN",
  "daysFromCreationUntilExpiration": 30,
  "userInvited": {
    // User object
  },
  "projectInvitedTo": {
    // Project object
  },
  "createdAt": "2017-11-12T20:26:47.000Z",
  "updatedAt": "2017-11-12T20:26:47.000Z"
 }
 ]
 */
router.get('/projects/:id/invites', invitesController.getInvitesByProjectId);

/**
 * @api {get} /user/invites Get invites for an authenticated user
 * @apiVersion 1.0.0
 * @apiName user invites
 * @apiGroup Invites
 *
 * @apiPermission authenticated user
 *
 * @apiSuccess {Object[]} invites list of invites for authenticated user
 * @apiSuccessExample {json} Success-Response:
 * [
 {
  "id": 1,
  "status": "OPEN",
  "daysFromCreationUntilExpiration": 30,
  "userInvited": {
    // User object
  },
  "projectInvitedTo": {
    // Project object
  },
  "createdAt": "2017-11-12T20:26:47.000Z",
  "updatedAt": "2017-11-12T20:26:47.000Z"
 }
 ]
 */
router.get('/user/invites', invitesController.getInvitesByAuthenticatedUser);

/**
 * @api {post} /projects/:projectId/invites/:userId Invite a contributor to the project
 * @apiVersion 1.0.0
 * @apiName invite contributor to the project
 * @apiGroup Invites
 *
 * @apiPermission project owner
 *
 * @apiParam {String} projectId the id of the project
 * @apiParam {String} userId user id or username of the user to invite as a contributor
 * @apiParam {Number} [daysUntilExpiration] the invite will expire after this many days have passed
 *   since the invite was created. Must be a non-negative integer. Optional: Defaults to 30 days.
 *
 * @apiSuccess {Object[]} invite the contributor invitation
 * @apiSuccessExample {json} Success-Response
 *
 {
  "id": 1,
  "status": "OPEN",
  "daysFromCreationUntilExpiration": 30,
  "userInvited": {
    // User object
  },
  "projectInvitedTo": {
    // Project object
  },
  "createdAt": "2017-11-12T20:26:47.000Z",
  "updatedAt": "2017-11-12T20:26:47.000Z"
 }
 */
router.post('/projects/:projectId/invites/:userId', invitesController.addInviteToProject);

/**
 * @api {delete} /invites/:id Remove (rescind) a contributor invitation
 * @apiVersion 1.0.0
 * @apiName remove contributor invitation to project
 * @apiGroup Invites
 *
 * @apiPermission project owner
 *
 * @apiParam {String} id invite id of the contributor invitation to rescind
 *
 * @apiSuccessExample {json} Success-Response
 * Status: 204 No Content
 */
router.delete('/invites/:id', invitesController.deleteInvite);
