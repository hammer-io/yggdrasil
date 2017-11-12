/* eslint-disable prefer-destructuring */
import express from 'express';
import * as projectService from './../services/projects';
import * as responseHelper from '../utils/response-helper';

const router = express.Router();

/**
 * @api {get} /projects Get all public projects
 * @apiVersion 1.0.0
 * @apiName projects
 * @apiGroup Projects
 *
 * @apiPermission none
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
router.get('/projects', async (req, res) => {
  try {
    const projects = await projectService.getAllProejcts();
    res.send(projects);
  } catch (error) {
    responseHelper.internalError(res, error);
  }
});

/**
 * @api {get} /user/projects Get projects for an authenticated user
 * @apiVersion 1.0.0
 * @apiName user projects
 * @apiGroup Projects
 *
 * @apiPermission authenticated user
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
router.get('/user/projects', (req, res) => {
  const userId = 1; // TODO get userId from authenticated request

  try {
    const projects = projectService.getProjectsByUser(userId);

    if (projects === null) {
      responseHelper.notFound(res);
    } else {
      res.send(projects);
    }
  } catch (error) {
    responseHelper.internalError(res, error);
  }
});

/**
 * @api {get} /users/:userId/projects Get a project by user id
 * @apiVersion 1.0.0
 * @apiName get projects for user
 * @apiGroup Projects
 *
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
router.get('/users/:user/projects', async (req, res) => {
  const user = req.params.user;

  try {
    const projects = await projectService.getProjectsByUser(user);
    if (projects === null) {
      responseHelper.notFound(res);
    } else {
      res.send(projects);
    }
  } catch (error) {
    console.log(error);
    responseHelper.internalError(res, error);
  }
});

/**
 * @api {get} /projects/:projectId Get project by id
 * @apiVersion 1.0.0
 * @apiName get project by id
 * @apiGroup Projects
 *
 * @apiPermission autenticated user
 *
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
router.get('/projects/:projectId', async (req, res) => {
  const projectId = req.params.projectId;
  try {
    const project = await projectService.getProjectById(projectId);

    if (project == null) {
      responseHelper.notFound(res);
    } else {
      res.send(project);
    }
  } catch (error) {
    responseHelper.internalError(res);
  }
});

/**
 * @api {post} /projects/projects Create a project for an authenticated user
 * @apiVersion 1.0.0
 * @apiName post project for authenticated user
 * @apiGroup Projects
 *
 * @apiPermission authenticated user
 *
 * @apiParam {String} projectName the name of the project
 * @apiParam {String} description the description to the project
 * @apiParam {String} version the version of the project
 * @apiParam {String} license the name of the license
 * @apiParam {[String]} authors a list of author names
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
 *  "authors": ["Holmgang"],
 *  "containerizationTool": "Docker",
 *  "continuousIntegrationTool": "TravisCI",
 *  "deploymentTool": "Heroku",
 *  "webFramework": "ExpressJS"
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
router.post('/user/projects', async (req, res) => {
  const userId = 1; // TODO authenticate user
  try {
    const projectCreated = await projectService.createProject(req.body, userId);
    res.send(projectCreated);
  } catch (error) {
    console.log(error);
    responseHelper.internalError(res, error);
  }
});

/**
 * @api {post} /user/:user/projects Create a project
 * @apiVersion 1.0.0
 * @apiName post project for user
 * @apiGroup Projects
 *
 * @apiPermission authenticated user
 *
 * @apiParam {String} user the username or userid of the user to create a project for
 * @apiParam {String} projectName the name of the project
 * @apiParam {String} description the description to the project
 * @apiParam {String} version the version of the project
 * @apiParam {String} license the name of the license
 * @apiParam {[String]} authors a list of author names
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
 *  "authors": ["Holmgang"],
 *  "containerizationTool": "Docker",
 *  "continuousIntegrationTool": "TravisCI",
 *  "deploymentTool": "Heroku",
 *  "webFramework": "ExpressJS"
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
router.post('/user/:user/projects', async (req, res) => {
  const project = req.body;
  const user = req.params.user;
  try {
    const projectCreated = await projectService.createProject(project, user);
    res.send(projectCreated);
  } catch (error) {
    console.log(error);
    responseHelper.internalError(res, error);
  }
});

/**
 * @api {patch} /projects/:id Update a project
 * @apiVersion 1.0.0
 * @apiName patch project
 * @apiGroup Projects
 *
 * @apiPermission project owner
 *
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
router.patch('/projects/:id', async (req, res) => {
  const projectToUpdate = req.body;
  const projectId = req.params.id;

  try {
    const projectUpdated = await projectService.updateProject(projectToUpdate, projectId);
    res.send(projectUpdated);
  } catch (error) {
    responseHelper.internalError(res, error);
  }
});

/**
 * @api {delete} /projects/:id Delete a project
 * @apiVersion 1.0.0
 * @apiName delete project
 * @apiGroup Projects
 *
 * @apiPermission project owner
 *
 * @apiSuccess {Object} project the deleted project
 * @apiSuccessExample {json} Success-Response
 * Status: 204 No Content
 */
router.delete('/projects/:id', async (req, res) => {
  const projectId = req.params.id;
  try {
    const project = await projectService.deleteProjectById(projectId, false);
    if (project === null) {
      responseHelper.notFound(res);
    } else if (project.deletedAt === null) {
      responseHelper.internalError(res, new Error('Project was not deleted'));
    } else {
      responseHelper.noContent(res);
    }
  } catch (error) {
    responseHelper.internalError(res, error);
  }
});

module.exports = router;
