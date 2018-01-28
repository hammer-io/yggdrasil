import uid from 'uid-safe';
import sequelize from 'sequelize';

import RequestParamError from '../error/RequestParamError';
import InvalidRequestException from '../error/InvalidRequestException';
import TokenNotFoundException from '../error/TokenNotFoundException';
import CodeNotFoundException from '../error/CodeNotFoundException';

export default class AuthService {
  /**
   * Constructor for AuthService.  Connects to the code and token repository.
   *
   * @param codeRepository
   * @param tokenRepository
   * @param log
   */
  constructor(tokenRepository, codeRepository, log) {
    this.tokenRepository = tokenRepository;
    this.codeRepository = codeRepository;
    this.log = log;
    this.CODE_LENGTH = 16;
    this.TOKEN_LENGTH = 256;
    this.CLIENT = 'client';
    this.USER = 'user';
    this.TOKEN = 'token';
    this.ACCESS_CODE = 'access code';
    this.REDIRECT_URI = 'redirect URI';
  }

  /**
   * Validates that the id is defined and that it is an integer.
   *
   * @param type the type of the id for error descriptions and logging
   * @param id the id
   * @returns {Promise.<Array>} array containing errors if they exist
   */
  async validateId(type, id) {
    this.log.verbose(`AuthService: validating id ${id} for ${type}`);

    const errors = [];
    if (!id) {
      errors.push(new RequestParamError(`${type}Id`, `${type}Id is required.`));
    }

    return errors;
  }

  /**
   * Validates that the given value exists.
   *
   * @param type the type of the id for error descriptions and logging
   * @param value the value
   * @returns {Promise.<Array>} array containing errors if they exist
   */
  async exists(type, value) {
    this.log.verbose(`AuthService: checking that the ${type} value ${value} is not null or undefined`);

    const errors = [];
    if (!value) {
      errors.push(new RequestParamError(`${type}`, `${type} is required.`));
    }

    return errors;
  }

  /**
   * Creates a token of length 256 for the client and user to use as an auth strategy.
   *
   * @param userId the user id of the user associated with the token
   * @returns {Promise.<*>} the newly created token
   */
  async createToken(userId) {
    this.log.info('AuthService: create token');

    const errors = await this.validateId(this.USER, userId);
    if (errors.length !== 0) {
      return Promise.reject(new InvalidRequestException(errors));
    }

    try {
      const token = await this.tokenRepository.create({
        value: uid.sync(this.TOKEN_LENGTH),
        userId
      });
      return token;
    } catch (err) {
      if (err instanceof sequelize.ForeignKeyConstraintError) {
        return Promise.reject(new InvalidRequestException([err]));
      }
      return Promise.reject(err);
    }
  }

  /**
   * Find a token by it's value if it exists.
   *
   * @param tokenValue the value of the token
   * @returns {Promise.<*>} the found token
   */
  async findOneTokenByValue(tokenValue) {
    this.log.info('AuthService: find token by value');

    const errors = await this.exists(this.TOKEN, tokenValue);
    if (errors.length !== 0) {
      return Promise.reject(new InvalidRequestException(errors));
    }

    const token = await this.tokenRepository.findOne({
      where:
        {
          value: tokenValue
        }
    });
    if (token === null || token.length === 0) {
      return Promise.reject(new TokenNotFoundException(`Token ${tokenValue} not found`));
    }

    return token;
  }

  /**
   * Create a code for a given client.
   *
   * @param redirectUri where the client should be redirected upon success
   * @param user the user id who owns the client
   * @returns {Promise.<*>} the newly created code
   */
  async createCode(redirectUri, user) {
    this.log.info(`AuthService: create new access code and redirect to ${redirectUri}`);

    let errors = await this.validateId(this.USER, user);
    errors = errors.concat(await this.exists(this.REDIRECT_URI, redirectUri));
    if (errors.length !== 0) {
      return Promise.reject(new InvalidRequestException(errors));
    }

    const code = {
      value: uid.sync(this.CODE_LENGTH),
      redirectURI: redirectUri,
      userId: user
    };
    try {
      const createdCode = await this.codeRepository.create(code);
      return createdCode;
    } catch (err) {
      if (err instanceof sequelize.ForeignKeyConstraintError) {
        return Promise.reject(new InvalidRequestException([err]));
      }

      return Promise.reject(err);
    }
  }


  /**
   * Find a code by the given value.
   *
   * @param codeValue the value of the code
   * @returns {Promise.<*>} the found code
   */
  async findOneCodeByValue(codeValue) {
    this.log.info('AuthService: find access code by value');

    const errors = await this.exists(this.ACCESS_CODE, codeValue);
    if (errors.length !== 0) {
      return Promise.reject(new InvalidRequestException(errors));
    }

    const code = await this.codeRepository.findOne({
      where:
        {
          value: codeValue
        }
    });
    if (code === null || code.length === 0) {
      return Promise.reject(new CodeNotFoundException(`Token ${codeValue} not found`));
    }

    return code;
  }

  /**
   * Delete the code with this value.
   *
   * @param codeValue the value of the code
   * @returns {Promise.<*>} the found code
   */
  async deleteCode(codeValue) {
    this.log.info('AuthService: delete the access code with the given value');

    const errors = await this.exists(this.ACCESS_CODE, codeValue);
    if (errors.length !== 0) {
      return Promise.reject(new InvalidRequestException(errors));
    }

    const code = await this.codeRepository.destroy({
      where:
        {
          value: codeValue
        }
    });
    if (code === null || code === 0) {
      return Promise.reject(new CodeNotFoundException(`Token ${codeValue} not found`));
    }

    return code;
  }
}

