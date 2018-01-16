/* eslint-disable prefer-destructuring,no-unused-vars */

/**
 * The project controller. This controller is for any routes dealing with projects. It is
 * dependent on the projectService which should be set in the project-routes.js file.
 */

import { validationResult } from 'express-validator/check';
import * as responseHelper from './../utils/response-helper';

let projectService = {};

/**
 * Handles the GET /project endpoint
 * @param req the request
 * @param res the response
 * @param next to the next middleware
 */
export async function getAllProjects(req, res, next) {
  try {
    const projects = await projectService.getAllProjects();
    res.send(projects);
  } catch (error) {
    next(error);
  }
}

/**
 * Helper function to get a project for a user
 * @param user the user to create the project for
 * @param res the response
 * @param next the next middleware
 */
async function getProjectsForUser(user, res, next) {
  try {
    const projects = await projectService.getProjectsByUser(user);
    res.send(projects);
  } catch (error) {
    next(error);
  }
}

/**
 * Handles the GET /user/projects endpoint
 * @param req the request
 * @param res the response
 * @param next the next middleware
 */
export async function getProjectByAuthenticatedUser(req, res, next) {
  const userId = 1; // TODO get userId from authenticated request
  await getProjectsForUser(userId)
}

/**
 * Handles the GET user/:user/projects endpoint
 * @param req the request
 * @param res the response
 * @param next the next middleware
 */
export async function getProjectsByUser(req, res, next) {
  const user = req.params.user;
  await getProjectsForUser(user, res, next);
}

/**
 * Handles the GET projects/:projectId endpoint
 * @param req the request
 * @param res the response
 * @param next the next middleware
 */
export async function getProjectById(req, res, next) {
  const projectId = req.params.projectId;
  try {
    const project = await projectService.getProjectById(projectId);
    res.send(project);
  } catch (error) {
    next(error)
  }
}

/**
 * Helper function to create a new new project
 * @param user the user to create a project for
 * @param project the project to create
 * @param req the request
 * @param res the response
 * @param next the next middleware
 */
async function createProject(user, project, req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  try {
    const projectCreated = await projectService.createProject(project, user);
    res.send(projectCreated);
  } catch (error) {
    next(error);
  }
}

/**
 * Handles the POST user/projects endpoint
 * @param req the request
 * @param res the response
 * @param next the next middleware
 */
export async function createProjectForAuthenticatedUser(req, res, next) {
  const user = 1; // TODO authenticate user
  await createProject(user, req.body, req, res, next);
}

/**
 * Handles the POST user/:user/proejcts endpoint
 * @param req the request
 * @param res the response
 * @param next the next middleware
 */
export async function createProjectForUser(req, res, next) {
  const user = req.param.user; // TODO authenticate user
  await createProject(user, req.body, res, next);
}

/**
 * Handles the PATCH projects/:projectId endpoint
 * @param req the request
 * @param res the response
 * @param next the next middleware
 */
export async function updateProjectById(req, res, next) {
  const projectToUpdate = req.body;
  const projectId = req.params.id;

  try {
    const projectUpdated = await projectService.updateProject(projectToUpdate, projectId);
    res.send(projectUpdated);
  } catch (error) {
    next(error);
  }
}

/**
 * Handles the DELETE projects/:projectId endpoint
 * @param req the request
 * @param res the response
 * @param next the next middleware
 */
export async function deleteProjectById(req, res, next) {
  const projectId = req.params.id;
  try {
    await projectService.deleteProjectById(projectId, false);
    responseHelper.noContent(res);
  } catch (error) {
    next(error);
  }
}

/**
 * Injects the project service dependency
 * @param newProjectService the project service
 */
export function setProjectService(newProjectService) {
  projectService = newProjectService;
}
