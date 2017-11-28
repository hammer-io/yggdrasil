import validator from 'validator';
import uid from 'uid-safe';

import InvalidRequestException from '../error/InvalidRequestException';
import TokenNotFoundException from '../error/TokenNotFoundException';
import CodeNotFoundException from '../error/CodeNotFoundException';

export default class AuthService {
  constructor(authRepository, codeRepository, log) {
    this.authRepository = authRepository;
    this.codeRepository = codeRepository;
    this.log = log;
    this.CODE_LENGTH = 16;
    this.TOKEN_LENGTH = 256;
  }

  async createToken(clientId, userId) {
    this.log.info('AuthService: create token');
    // validate here
    const errors = [];
    if (errors.length !== 0) {
      return Promise.reject(new InvalidRequestException(errors));
    }

    const token = await this.authRepository.create({
      value: uid.sync(this.TOKEN_LENGTH), // TODO
      clientId,
      userId
    });

    return token;
  }

  async findOneTokenByValue(tokenValue) {
    this.log.info('AuthService: find token by value');
    // validate here
    const errors = [];
    if (errors.length !== 0) {
      return Promise.reject(new InvalidRequestException(errors));
    }

    const token = await this.authRepository.findOne({
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

  async createCode(client, redirectUri, user, ares) {
    this.log.info('AuthService: find token by value');
    // validate here
    const errors = [];
    if (errors.length !== 0) {
      return Promise.reject(new InvalidRequestException(errors));
    }

    const code = {
      value: uid.sync(this.CODE_LENGTH), // TODO figure this out
      redirectUri
    };
    const createdCode = await this.codeRepository.create(code);

    createdCode.setClient(client);
    createdCode.setUser(user);

    return createdCode;
  }


  async findOneCodeByValue(codeValue) {
    this.log.info('AuthService: find access code by value');
    // validate here
    const errors = [];
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

  async deleteCode(codeValue) {
    this.log.info('AuthService: delete the access code with the given value');

    const errors = [];
    if (errors.length !== 0) {
      return Promise.reject(new InvalidRequestException(errors));
    }

    const code = await this.codeRepository.delete({
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
}

