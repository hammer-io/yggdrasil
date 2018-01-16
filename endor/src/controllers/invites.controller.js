/* eslint-disable prefer-destructuring */
import * as responseHelper from './../utils/response-helper';

let inviteService = {};
let userService = {};
let projectService = {};

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
 * Handles the GET /projects/:id/invites endpoint
 * @param req the request
 * @param res the response
 * @param next the next middleware
 */
export async function getInvitesByProjectId(req, res, next) {
  try {
    const invites = await inviteService.getInvitesByProjectId(req.params.id);
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
    const invites = await inviteService.getInvitesByUserId(req.params.id);
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
  req.params.id = 1; // TODO get userId from authenticated request
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
    const projectId = req.params.projectId;
    const userId = req.params.userId;
    const daysUntilExpiration = req.params.daysUntilExpiration;

    // Validate that the user and project actually exist
    await projectService.getProjectById(projectId);
    await userService.getUserByIdOrUsername(userId);

    const invite = await inviteService.createInvite(projectId, userId, daysUntilExpiration);
    res.status(201).send(invite);
  } catch (error) {
    next(error);
  }
}

/**
 * Handles the DELETE /projects/:projectId/invites/:inviteId endpoint
 * @param req the request
 * @param res the response
 * @param next the next middleware
 */
export async function deleteInvite(req, res, next) {
  try {
    const inviteId = req.params.id;
    await inviteService.deleteInvite(inviteId);
    responseHelper.noContent(res);
  } catch (error) {
    next(error);
  }
}
