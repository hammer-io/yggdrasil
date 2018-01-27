import validator from 'validator';
import bcrypt from 'bcrypt';

import UserNotFoundException from '../error/UserNotFoundException';
import InvalidRequestException from '../error/InvalidRequestException';
import InvalidCredentialsException from '../error/InvalidCredentialsException';
import RequestParamError from '../error/RequestParamError';

const SALT_ROUNDS = 10;

export default class UserService {
  /**
   * User Service constructor
   * @param userRepository the user repository to inject (most likely something from sequelize)
   * @param credentialsRepository the credentials repository to inject
   * @param log the logger to inject
   */
  constructor(userRepository, credentialsRepository, log) {
    this.userRepository = userRepository;
    this.credentialsRepository = credentialsRepository;
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
   * @param requireName true if name should be validated
   * @returns {Array} list of errors
   */
  async validateUser(user, withRequired, requireName = false) {
    const errors = [];
    if (withRequired) {
      if (!('username' in user)) {
        errors.push(new RequestParamError('username', 'Username is required.'));
      }

      if (!('email' in user)) {
        errors.push(new RequestParamError('email', 'Email is required.'));
      }
    }
    if (requireName) {
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
   * Validates the credentials of a user
   * @param password
   * @returns {Promise.<Array>}
   */
  async validateCredentials(password) {
    this.log.info('UserService: Validating credentials');
    const errors = [];

    if (password === null || password === undefined || password.length < 8 || !password.match(/\d+/g)) {
      errors.push(new RequestParamError('password', 'Must contain at least one digit and have at least eight characters.'))
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

  async getCredentialsByUsername(username, password) {
    this.log.info(`UserService: find credentials of user with username ${username}`);
    const userFound = await this.userRepository.findOne({
      where: {
        username
      }
    });
    if (userFound === null) {
      return Promise.reject(new InvalidCredentialsException('Invalid credentials'));
    }

    const cred = await this.credentialsRepository.findOne({
      where: {
        userId: userFound.id
      }
    });
    const match = bcrypt.compareSync(password, cred.password);

    if (!match) {
      return Promise.reject(new InvalidCredentialsException('Invalid credentials'))
    }

    return userFound;
  }

  /**
   * Creates a new user
   * @param user the user to create
   * @param password the credentials object associated with the user being created
   * @param validateName if the user should be validated defaults to true
   * @returns {Object} the created user
   */
  async createUser(user, password, validateName = true) {
    this.log.info(`UserService: creating user ${user}`);

    const userErrors = await this.validateUser(user, true, validateName);
    if (userErrors.length !== 0) {
      return Promise.reject(new InvalidRequestException(userErrors));
    }

    const credentialErrors = await this.validateCredentials(password);
    if (credentialErrors.length !== 0) {
      return Promise.reject(new InvalidRequestException(credentialErrors));
    }

    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    const credentials = {
      salt,
      password: await bcrypt.hashSync(password, salt)
    };

    const userCreated = await this.userRepository.create(user);
    const cred = await this.credentialsRepository.create(credentials);
    await cred.setUser(userCreated);
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
