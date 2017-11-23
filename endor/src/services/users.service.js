import validator from 'validator';

import UserNotFoundException from '../error/UserNotFoundException';
import InvalidRequestException from '../error/InvalidRequestException';
import RequestParamError from '../error/RequestParamError';

export default class UserService {
  /**
   * User Service constructor
   * @param userRepository the user repository to inject (most likely something from sequalize)
   * @param log the logger to inject
   */
  constructor(userRepository, log) {
    this.userRepository = userRepository;
    this.log = log;
  }


  /**
   * Checks if there is user already with the given username
   * @param username the username to check
   * @returns {Boolean} true if duplicate, false otherwise
   */
  async isDuplicateUsername(username) {
    this.log.info(`UserService: checking duplicate username ${username}`);
    try {
      await this.getUserByIdOrUsername(username);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if there is user already with the given email
   * @param email the email to check
   * @returns {Boolean} true if duplicate, false otherwise
   */
  async isDuplicateEmail(email) {
    this.log.info(`UserService: checking duplicate email ${email}`);
    try {
      await this.getUserByEmail(email);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Validates a user
   * @param user the user to validate
   * @param withRequired check required fields or not (useful for POST to PATH)
   * @returns {Array} list of errors
   */
  async validateUser(user, withRequired) {
    const errors = [];
    if (withRequired) {
      if (!('username' in user)) {
        errors.push(new RequestParamError('username', 'Username is required.'));
      }

      if (!('email' in user)) {
        errors.push(new RequestParamError('email', 'Email is required.'));
      }

      if (!('firstName' in user)) {
        errors.push(new RequestParamError('firstName', 'First Name is required.'));
      }

      if (!('lastName' in user)) {
        errors.push(new RequestParamError('lastName', 'Last Name is required.'))
      }
    }

    // check duplicate username
    if (user.username) {
      if (await this.isDuplicateUsername(user.username)) {
        errors.push(new RequestParamError('username', `User with username ${user.username} already exists.`));
      }
    }

    if (user.email) {
      if (!validator.isEmail(user.email)) {
        errors.push(new RequestParamError('email', 'Must be a valid email.'));
      }

      if (await this.isDuplicateEmail(user.email)) {
        errors.push(new RequestParamError('email', `User with email ${user.email} already exists.`));
      }
    }

    return errors;
  }

  /**
   * Gets all users that have not been deleted
   * @returns {Array} a list of all users
   */
  async getAllUsers() {
    this.log.info('UserService: get all users');
    const users = await this.userRepository.findAll();
    return users;
  }

  /**
   * Gets a user by their user id or username
   * @param user the user id or username to find by
   * @returns {Object} the user that was found
   */
  async getUserByIdOrUsername(user) {
    this.log.info(`UserService: find user with username/user id of ${user}`);
    const userFound = await this.userRepository.findOne({
      where: {
        $or: {
          id: user,
          username: user
        }
      }
    });

    if (userFound === null) {
      throw new UserNotFoundException(`User with ${user} could not be found.`);
    }

    return userFound;
  }

  /**
   * Gets an email by their email
   * @param email the email to find by
   * @returns {Object} the user that was found
   */
  async getUserByEmail(email) {
    this.log.info(`UserService: find user with email of ${email}`);
    const userFound = await this.userRepository.findOne({
      where: {
        email
      }
    });

    if (userFound === null) {
      throw new UserNotFoundException(`User with email ${email} could not be found.`);
    }

    return userFound;
  }

  /**
   * Creates a new user
   * @param user the user to create
   * @returns {Object} the created user
   */
  async createUser(user) {
    this.log.info(`UserService: creating user ${user}`);

    const errors = await this.validateUser(user, true);
    if (errors.length !== 0) {
      throw new InvalidRequestException(errors);
    }

    const userCreated = await this.userRepository.create(user);
    return userCreated;
  }

  /**
   * Updates a user
   * @param userIdOrUsername the user id or username to update
   * @param user the user information
   * @returns {Object} the updated user
   */
  async updateUser(userIdOrUsername, user) {
    this.log.info(`UserService: update user ${userIdOrUsername}`);

    const errors = await this.validateUser(user, false);
    if (errors.length !== 0) {
      throw new InvalidRequestException(errors);
    }

    const foundUser = await this.getUserByIdOrUsername(userIdOrUsername);
    if (foundUser === null) {
      throw new UserNotFoundException(`User ${userIdOrUsername} not found.`);
    }

    const userUpdated = await foundUser.update(user);
    return userUpdated;
  }

  /**
   * Deletes a user by their username or their user id
   * @param user the username or user id to delete by
   * @returns {Object} the user that was deleted
   */
  async deleteUserByIdOrUsername(user) {
    this.log.info(`UserService: delete user with username/user id ${user}`);
    const userToBeDeleted = await this.getUserByIdOrUsername(user);
    await userToBeDeleted.destroy();
    return userToBeDeleted;
  }
}
