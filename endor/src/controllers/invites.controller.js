/* eslint-disable prefer-destructuring */
import { InviteStatus } from '../db/sequelize';

let inviteService = {};
let userService = {};
let projectService = {};
let emailService = {};

/**
 * Sets the invite service for the controller
 * @param newInviteService the new invite service
 */
export function setInviteService(newInviteService) {
  inviteService = newInviteService;
}

/**
 * Sets the user service for the controller
 * @param newUserService the new project service
 */
export function setUserService(newUserService) {
  userService = newUserService;
}

/**
 * Sets the project service for the controller
 * @param newProjectService the new project service
 */
export function setProjectService(newProjectService) {
  projectService = newProjectService;
}

/**
 * Sets the email service for the controller
 * @param newEmailService the new email service
 */
export function setEmailService(newEmailService) {
  emailService = newEmailService;
}

/**
 * Handles the GET /projects/:id/invites endpoint
 * @param req the request
 * @param res the response
 * @param next the next middleware
 */
export async function getInvitesByProjectId(req, res, next) {
  try {
    const invites = await inviteService.getInvitesByProjectId(req.params.id, req.query.status);
    res.send(invites);
  } catch (error) {
    next(error);
  }
}

/**
 * Gets all the invites for a particular user
 * @param req the request
 * @param res the response
 * @param next the next middleware
 */
export async function getInvitesByUserId(req, res, next) {
  try {
    const invites = await inviteService.getInvitesByUserId(req.params.id, req.query.status);
    invites.other = req.params.other;
    res.send(invites);
  } catch (error) {
    next(error);
  }
}

/**
 * Handles the GET /user/invites endpoint
 * @param req the request
 * @param res the response
 * @param next the next middleware
 */
export async function getInvitesByAuthenticatedUser(req, res, next) {
  req.params.id = req.user.id;
  return getInvitesByUserId(req, res, next);
}

/**
 * Handles the POST /projects/:projectId/invites/:userId endpoint
 * @param req the request
 * @param res the response
 * @param next the next middleware
 */
export async function addInviteToProject(req, res, next) {
  try {
    // noinspection JSUnresolvedVariable
    const projectId = req.params.projectId;
    const userIdOrUsername = req.params.user;
    const daysFromCreationUntilExpiration = req.body.daysFromCreationUntilExpiration;

    // Validate that the user and project actually exist
    const project = await projectService.getProjectById(projectId);
    const user = await userService.getUserByIdOrUsername(userIdOrUsername);

    const invite = await inviteService.createInvite(
      projectId,
      userIdOrUsername,
      daysFromCreationUntilExpiration
    );

    await emailService.emailInvite(user, project, invite);

    res.status(201).send(invite);
  } catch (error) {
    next(error);
  }
}

/**
 * Change an invite status from OPEN to either ACCEPTED, DECLINED, or RESCINDED
 * @param req the request
 * @param res the response
 * @param next the next middleware
 * @param status the status that the invite should be changed to
 */
async function updateInvite(req, res, next, status) {
  try {
    const inviteId = req.params.id;
    const updatedInvite = await inviteService.updateInvite(inviteId, status);

    res.status(201).send(updatedInvite);
  } catch (error) {
    next(error);
  }
}

/**
 * Handles the UPDATE /invites/:id/accept endpoint
 * @param req the request
 * @param res the response
 * @param next the next middleware
 */
export async function acceptInvite(req, res, next) {
  return updateInvite(req, res, next, InviteStatus.ACCEPTED);
}

/**
 * Handles the UPDATE /invites/:id/decline endpoint
 * @param req the request
 * @param res the response
 * @param next the next middleware
 */
export async function declineInvite(req, res, next) {
  return updateInvite(req, res, next, InviteStatus.DECLINED);
}

/**
 * Handles the UPDATE /invites/:id/rescind endpoint
 * @param req the request
 * @param res the response
 * @param next the next middleware
 */
export async function rescindInvite(req, res, next) {
  return updateInvite(req, res, next, InviteStatus.RESCINDED);
}
