import UnauthorizedException from '../error/UnauthorizedException';

let userService = {};

/**
 * Checks if the user is the same as the user specified by the user id/username in the parameters.
 *
 * @param req - the request
 * @param res - the response
 * @param next - the next middleware
 * @returns [errors]
 */
export async function userAuthorization(req, res, next) {
  const authenticatedUser = req.user.id;
  if (req.params.user !== authenticatedUser) {
    const user = await userService.getUserByIdOrUsername(req.params.user);
    if (user.id !== authenticatedUser) {
      res.status(401).send(new UnauthorizedException('The user is unauthorized to perform this action'));
    }
  }
  next();
}

export function setDependencies(newUserService) {
  userService = newUserService;
}

