import sequalize from './../db/sequelize';
import { getActiveLogger } from '../utils/winston';
import UserNotFoundException from '../error/UserNotFoundException';
import ProjectNotFoundException from '../error/ProjectNotFoundException';

const log = getActiveLogger();

/**
 * Gets all of the projects in the system
 * @returns all of the projects in the system
 */
export async function getAllProjects() {
  log.info('ProjectService: find all projects');
  const projects = await sequalize.Project.findAll();
  return projects;
}

/**
 * Gets project by id
 * @param projectId the id to find by
 * @returns the project with the given id
 */
export async function getProjectById(projectId) {
  log.info(`ProjectService: get project with id ${projectId}`);
  const project = await sequalize.Project.findById(projectId);
  if (project === null) {
    throw new ProjectNotFoundException(`Project with id ${projectId} not found`);
  }


  return project;
}

/**
 * Finds projects for a user
 * @param user the userId to find by
 * @returns the projects for the user separated by owned and contributed
 */
export async function getProjectsByUser(user) {
  log.info(`ProjectService: get projects for user ${user}`);
  console.log(user);
  const userFound = await sequalize.User.findOne({
    where: {
      $or: {
        id: user,
        username: user
      }
    }
  });

  if (userFound === null) {
    throw new UserNotFoundException(`User with ${user} could not be found.`)
  }

  const projectsOwned = await userFound.getProjectsOwned();
  const projectsContributed = await userFound.getProjectsContributed();

  const projects = {};
  projects.owned = projectsOwned;
  projects.contributed = projectsContributed;

  return projects;
}

/**
 * Creates a new project
 *
 * @param project the values of the project
 * @param user the user id or username of the user creating the project
 * @returns the created project if successful, null otherwise
 */
export async function createProject(project, user) {
  log.info(`ProjectService: create project for user ${user}`);
  const userFound = await sequalize.User.findOne({
    where: {
      $or: {
        id: user,
        username: user
      }
    }
  });

  // if the user was not found, throw error
  if (userFound === null) {
    throw new UserNotFoundException(`User with ${user} could not be found.`)
  }

  // create
  const projectCreated = await sequalize.Project.create(project);
  await projectCreated.addOwners(userFound);

  return projectCreated;
}

/**
 * Updates an existing project
 * @param project the project values
 * @param projectId the project id to update
 * @returns the updated project if it was updated, null otherwise.
 */
export async function updateProject(project, projectId) {
  log.info(`ProjectService: update project with id ${projectId}`);
  if (projectId) {
    const foundProject = await sequalize.Project.findById(projectId);
    if (foundProject === null) {
      throw new ProjectNotFoundException(`Project with id ${projectId} not found`);
    }

    const projectUpdated = await foundProject.update(project);
    return projectUpdated;
  }

  return null;
}


/**
 * Soft deletes a project by id
 * @param projectId project id
 * @param isForceDelete determines if it should be soft deleted or hard deleted
 * @returns the project that was deleted
 */
export async function deleteProjectById(projectId, isForceDelete) {
  log.info(`ProjectService: delete project with id ${projectId}`);
  const project = await sequalize.Project.findById(projectId);
  if (project === null) {
    throw new ProjectNotFoundException(`Project with id ${projectId} not found`);
  }

  await project.destroy({ force: isForceDelete });
  return project;
}

