import sequalize from './../db/sequelize';
import { getActiveLogger } from '../utils/winston';

const log = getActiveLogger();

/**
 * Gets all of the projects in the system
 * @returns all of the projects in the system
 */
export async function getAllProejcts() {
  const projects = await sequalize.Project.findAll();
  return projects;
}

/**
 * Gets project by id
 * @param id the id to find by
 * @returns the project with the given id
 */
export async function getProjectById(id) {
  const project = await sequalize.Project.findById(id);
  return project;
}

/**
 * Finds projects for a user
 * @param userId the userId to find by
 * @returns the projects for the user separated by owned and contributed
 */
export async function getProjectsByUser(user) {
  console.log(user);
  const userFound = await sequalize.User.findOne({
    where: {
      $or: {
        id: user,
        username: user
      }
    }
  });

  // if the user was not found, return null
  if (userFound === null) {
    log.error(`user with ${user} could not be found`);
    return null;
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
  // if no user to create for, then
  const userFound = await sequalize.User.findOne({
    where: {
      $or: {
        id: user,
        username: user
      }
    }
  });

  if (userFound === null) {
    return null;
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
  // update
  if (projectId) {
    const foundProject = await sequalize.Project.findById(projectId);
    if (foundProject === null) {
      return null;
    }

    const projectUpdated = await foundProject.update(project);
    return projectUpdated;
  }

  return null;
}


/**
 * Soft deletes a project by id
 * @param id project id
 * @param isForceDelete determines if it should be soft deleted or hard deleted
 * @returns the project that was deleted
 */
export async function deleteProjectById(id, isForceDelete) {
  const project = await sequalize.Project.findById(id);
  if (project === null) {
    return null;
  }

  await project.destroy({ force: isForceDelete });
  return project;
}

