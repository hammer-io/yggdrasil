/* eslint-disable max-len */
import express from 'express';
import * as invitesController from './../controllers/invites.controller';
import * as inviteValidator from './../middlewares/invites.middleware';

import * as authController from './../controllers/auth.controller';

export const router = express.Router();


/**
 * Set dependencies for the invites routes
 * @param inviteService the invite service dependency
 * @param userService the user service dependency
 * @param projectService the project service dependency
 */
export function setDependencies(inviteService, userService, projectService, emailService) {
  invitesController.setInviteService(inviteService);
  invitesController.setUserService(userService);
  invitesController.setProjectService(projectService);
  invitesController.setEmailService(emailService);
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
 * @apiParam {String} [status] the status to filter results by.
 *   May be one of the following: `['open','accepted','declined','rescinded','expired']`
 *
 * @apiSuccess {Object[]} contributor invites to the project
 * @apiSuccessExample {json} Success-Response
 * [
 {
  "id": 1,
  "status": "open",
  "daysFromCreationUntilExpiration": 30,
  "userInvitedId": "3",
  "projectInvitedToId": "1",
  "createdAt": "2017-11-12T20:26:47.000Z",
  "updatedAt": "2017-11-12T20:26:47.000Z"
 }
 ]
 */
router.get('/projects/:id/invites', authController.isAuthenticated, invitesController.getInvitesByProjectId);

/**
 * @api {get} /user/invites Get invites for an authenticated user
 * @apiVersion 1.0.0
 * @apiName user invites
 * @apiGroup Invites
 *
 * @apiPermission authenticated user
 *
 * @apiParam {String} [status] the status to filter results by.
 *   May be one of the following: `['open','accepted','declined','rescinded','expired']`
 *
 * @apiSuccess {Object[]} invites list of invites for authenticated user
 * @apiSuccessExample {json} Success-Response:
 * [
 {
  "id": 1,
  "status": "open",
  "daysFromCreationUntilExpiration": 30,
  "userInvitedId": "3",
  "projectInvitedToId": "1",
  "createdAt": "2017-11-12T20:26:47.000Z",
  "updatedAt": "2017-11-12T20:26:47.000Z"
 }
 ]
 */
router.get('/user/invites', authController.isAuthenticated, invitesController.getInvitesByAuthenticatedUser);

/**
 * @api {post} /projects/:projectId/invites/:userId Invite a contributor to the project
 * @apiVersion 1.0.0
 * @apiName invite contributor to the project
 * @apiGroup Invites
 *
 * @apiPermission project owner
 *
 * @apiParam {String} projectId the id of the project
 * @apiParam {String} user the username or id of the user to invite as a contributor
 * @apiParam {Number} [daysUntilExpiration] the invite will expire after this many days have passed
 *   since the invite was created. Must be a non-negative integer. Optional: Defaults to 30 days.
 *
 * @apiSuccess {Object[]} invite the invitation
 * @apiSuccessExample {json} Success-Response
 *
 {
  "id": 1,
  "status": "open",
  "daysFromCreationUntilExpiration": 30,
  "userInvitedId": "3",
  "projectInvitedToId": "1",
  "createdAt": "2017-11-12T20:26:47.000Z",
  "updatedAt": "2017-11-12T20:26:47.000Z"
 }
 */
router.post(
  '/projects/:projectId/invites/:user',
  authController.isAuthenticated,
  inviteValidator.checkForNonNegativeInteger,
  invitesController.addInviteToProject
);

/**
 * @api {put} /invites/:id/accept Accept an invitation. May only be used on an open invite.
 * @apiVersion 1.0.0
 * @apiName accept contributor invitation
 * @apiGroup Invites
 *
 * @apiPermission authenticated user referenced in the invite
 *
 * @apiParam {String} id invite id of the invitation to accept
 *
 * @apiSuccess {Object[]} invite the accepted invitation
 * @apiSuccessExample {json} Success-Response
 *
 {
  "id": 1,
  "status": "accepted",
  "daysFromCreationUntilExpiration": 30,
  "userInvitedId": "3",
  "projectInvitedToId": "1",
  "createdAt": "2017-11-12T20:26:47.000Z",
  "updatedAt": "2017-11-27T10:22:12.000Z"
 }
 */
router.put('/invites/:id/accept', authController.isAuthenticated, invitesController.acceptInvite);

/**
 * @api {put} /invites/:id/decline Decline an invitation. May only be used on an open invite.
 * @apiVersion 1.0.0
 * @apiName decline contributor invitation
 * @apiGroup Invites
 *
 * @apiPermission authenticated user referenced in the invite
 *
 * @apiParam {String} id invite id of the invitation to decline
 *
 * @apiSuccess {Object[]} invite the declined invitation
 * @apiSuccessExample {json} Success-Response
 *
 {
  "id": 1,
  "status": "declined",
  "daysFromCreationUntilExpiration": 30,
  "userInvitedId": "3",
  "projectInvitedToId": "1",
  "createdAt": "2017-11-12T20:26:47.000Z",
  "updatedAt": "2017-11-27T10:22:12.000Z"
 }
 */
router.put('/invites/:id/decline', authController.isAuthenticated, invitesController.declineInvite);

/**
 * @api {put} /invites/:id/rescind Rescind an invitation. May only be used on an open invite.
 * @apiVersion 1.0.0
 * @apiName rescind contributor invitation to project
 * @apiGroup Invites
 *
 * @apiPermission owner of the project referenced in the invitation
 *
 * @apiParam {String} id invite id of the contributor invitation to rescind
 *
 * @apiSuccess {Object[]} invite the rescinded invitation
 * @apiSuccessExample {json} Success-Response
 *
 {
  "id": 1,
  "status": "rescinded",
  "daysFromCreationUntilExpiration": 30,
  "userInvitedId": "3",
  "projectInvitedToId": "1",
  "createdAt": "2017-11-12T20:26:47.000Z",
  "updatedAt": "2017-11-27T10:22:12.000Z"
 }
 */
router.put('/invites/:id/rescind', authController.isAuthenticated, invitesController.rescindInvite);
