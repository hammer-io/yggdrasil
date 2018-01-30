import UnauthorizedException from '../error/UnauthorizedException';

let projectService = {};

/**
 * Checks if the authenticated user is an owner of the project id found in the parameters.
 * Throws an Unauthorized Exception and returns a status of 401 if the user is unauthorized.
 *
 * @param req - the request
 * @param res - the response
 * @param next - the next middleware
 * @returns {Promise.<void>}
 */
export async function ownerLevelAuthorization(req, res, next) {
  const authenticatedUser = req.user.id;
  const { projectId } = req.params;

  try {
    const owners = await projectService.getOwnersByProjectId(projectId);
    if (owners.filter(owner => owner.id === authenticatedUser).length !== 1) {
      res.status(401).send(new UnauthorizedException('The user is unauthorized to perform this action'));
    }
    next();
  } catch (err) {
    res.status(401).send(new UnauthorizedException('The user is unauthorized to perform this action'));
  }
}

/**
 * Checks if the authenticated user is an owner or a contributor of the project.
 * Throws an Unauthorized Exception and returns a status of 401 if the user is unauthorized.
 *
 * @param req - the request
 * @param res - the response
 * @param next - the next middleware
 * @returns {Promise.<void>}
 */
export async function contributorLevelAuthorization(req, res, next) {
  const authenticatedUser = req.user.id;
  const { projectId } = req.params;

  try {
    const { contributors, owners } = await projectService.getContributorsAndOwners(projectId);
    if (owners.filter(owner => owner.id === authenticatedUser).length !== 1
      || contributors.filter(contributor => contributor.id === authenticatedUser).length !== 1) {
      res.status(401).send(new UnauthorizedException('The user is unauthorized to perform this action'));
    }
    next();
  } catch (err) {
    res.status(401).send(new UnauthorizedException('The user is unauthorized to perform this action'));
  }
}


/**
 * Injects the project service dependency
 * @param newProjectService the project service
 */
export function setDependencies(newProjectService) {
  projectService = newProjectService;
}
