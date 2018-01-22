import sequelize from 'sequelize';

import InvalidRequestException from '../error/InvalidRequestException';
import ClientNotFoundException from '../error/ClientNotFoundException';
import RequestParamError from '../error/RequestParamError';
import NonUniqueError from '../error/NonUniqueError';

export default class ClientService {
  constructor(clientRepository, log) {
    this.clientRepository = clientRepository;
    this.log = log;
    this.CLIENT = 'client';
    this.USER = 'user';
  }

  /**
   * Validates that the new client has the required fields.
   *
   * @param client The client
   * @returns {Promise.<Array>} The errors with the given client
   */
  async validateNewClient(client) {
    this.log.verbose('ClientService: validating a new client');

    const errors = [];

    if (!client.name) {
      errors.push(new RequestParamError('client', 'Name is required'));
    }
    if (!client.clientId) {
      errors.push(new RequestParamError('client', 'ClientId is required'));
    }
    if (!client.secret) {
      errors.push(new RequestParamError('client', 'Secret is required'));
    }
    return errors;
  }

  /**
   * Validates that the id is defined and that it is an integer.
   *
   * @param type the type of the id for error descriptions and logging
   * @param id the id
   * @returns {Promise.<Array>} array containing errors if they exist
   */
  async validateId(type, id) {
    this.log.verbose(`ClientService: validating id ${id} for ${type}`);

    const errors = [];
    if (!id) {
      errors.push(new RequestParamError(`${type}Id`, `${type}Id is required.`));
    }
    if (Number.isNaN(Number(id))) {
      errors.push(new RequestParamError(`${type}Id`, `${type}Id must be a valid id.`));
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
    this.log.verbose(`ClientService: checking that the ${type} value ${value} is not null or undefined`);

    const errors = [];
    if (!value) {
      errors.push(new RequestParamError(`${type}`, `${type} is required.`));
    }

    return errors;
  }


  /**
   * Create a new client for the given user.
   *
   * @param client the new client
   * @returns {Promise.<*>} the newly created client
   */
  async createClient(client) {
    this.log.info(`ClientService: creating client ${client.name}`);

    const errors = await this.validateNewClient(client);
    if (errors.length !== 0) {
      return Promise.reject(new InvalidRequestException(errors));
    }

    try {
      const createdClient = await this.clientRepository.create(client);
      return createdClient;
    } catch (err) {
      if (err instanceof sequelize.UniqueConstraintError) {
        return Promise.reject(new NonUniqueError(err.errors, err.fields));
      }
      return Promise.reject(err);
    }
  }

  /**
   * Find one client by the client id (this is like the username of the client, not the actual id).
   *
   * @param clientId the clientId of the client
   * @returns {Promise.<*>} the found client
   */
  async findOneClientByClientId(clientId) {
    this.log.info(`ClientService: find one client ${clientId} by client id`);

    const errors = await this.exists(this.CLIENT, clientId);
    if (errors.length !== 0) {
      return Promise.reject(new InvalidRequestException(errors));
    }

    const client = await this.clientRepository.findOne({
      where:
        {
          clientId
        }
    });
    if (client === null || client.length === 0) {
      return Promise.reject(new ClientNotFoundException(`Clients ${clientId} not found`));
    }

    return client;
  }

  /**
   * Finds the client by their numerical id. The numerical one is the one that the database
   * assigns and not the one chosen by the user.
   *
   * @param id the id of the client
   * @returns {Promise.<*>}
   */
  async findOneClientById(id) {
    this.log.info(`ClientService: find one client ${id} by client id`);

    const errors = await this.validateId(this.CLIENT, id);
    if (errors.length !== 0) {
      return Promise.reject(new InvalidRequestException(errors));
    }

    const client = await this.clientRepository.findOne({
      where:
        {
          id
        }
    });
    if (client === null || client.length === 0) {
      return Promise.reject(new ClientNotFoundException(`Clients ${id} not found`));
    }

    return client;
  }
}
