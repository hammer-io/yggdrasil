/* eslint-disable prefer-destructuring */
import * as responseHelper from './../utils/response-helper';
import ContributorNotFoundException from '../error/ContributorNotFoundException';

let projectService = {};

/**
 * Handles the /projects/:id/contributors endpoint
 * @param req the request
 * @param res the response
 * @param next the next middleware
 */
export async function getContributorsByProjectId(req, res, next) {
  try {
    const projectId = req.params.id;
    const contributors = await projectService.getContributorsByProjectId(projectId);
    res.send(contributors);
  } catch (error) {
    next(error);
  }
}

/**
 * Handles the /projects/:id/contributors/:user
 * @param req the request
 * @param res the response
 * @param next the next middleware
 */
export async function checkIfUserIsContributor(req, res, next) {
  try {
    const projectId = req.params.id;
    const user = req.params.user;
    const isUserAContributor =
      await projectService.checkIfUserIsContributorOnProject(projectId, user);

    if (isUserAContributor) {
      responseHelper.noContent(res);
    } else {
      throw new ContributorNotFoundException(`User ${projectId} not found as a contributor on project with id ${projectId}`);
    }
  } catch (error) {
    next(error);
  }
}

/**
 * Handles the POST /projects/:id/contributors/:user endpoint
 * @param req the request
 * @param res the response
 * @param next the next middleware
 */
export async function addContributorToProject(req, res, next) {
  try {
    const projectId = req.params.projectId;
    const user = req.params.user;
    const contributors = await projectService.addContributorToProject(projectId, user);
    res.status(201).send(contributors);
  } catch (error) {
    next(error);
  }
}

/**
 * Handles the DELETE /projects/:id/contributors/:user endpoint
 * @param req the request
 * @param res the response
 * @param next the next middleware
 */
export async function deleteContributorFromProject(req, res, next) {
  try {
    const projectId = req.params.projectId;
    const user = req.params.user;
    await projectService.deleteContributorFromProject(projectId, user);
    responseHelper.noContent(res);
  } catch (error) {
    next(error);
  }
}

/**
 * Sets the project service for the controller
 * @param newProjectService the new project service
 */
export function setProjectService(newProjectService) {
  projectService = newProjectService;
}
