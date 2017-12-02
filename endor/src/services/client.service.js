
// TODO - validation
import InvalidRequestException from '../error/InvalidRequestException';
import ClientNotFoundException from '../error/ClientNotFoundException';
// import RequestParamError from '../error/RequestParamError';

export default class ClientService {
  constructor(clientRepository, userService, log) {
    this.clientRepository = clientRepository;
    this.userService = userService;
    this.log = log;
  }

  async createClient(userId, client) {
    this.log.info(`ClientService: creating client ${client.name}`);
    // validate client here
    const errors = [];
    if (errors.length !== 0) {
      return Promise.reject(new InvalidRequestException(errors));
    }

    const createdClient = await this.clientRepository.create(client);
    createdClient.setUser(userId);

    return createdClient;
  }

  async findAllClients(userId) {
    this.log.info(`ClientService: find all clients for user ${userId}`);
    // validate here
    const errors = [];
    if (errors.length !== 0) {
      return Promise.reject(new InvalidRequestException(errors));
    }

    const clients = await this.clientRepository.findAll({
      where:
        {
          userId
        }
    });
    if (clients === null || clients.length === 0) {
      return Promise.reject(new ClientNotFoundException(`Clients not found for user ${userId}`));
    }

    return clients;
  }

  async findOneClientByClientId(clientId) {
    this.log.info(`ClientService: find one client ${clientId} by client id`);
    // validate here
    const errors = [];
    if (errors.length !== 0) {
      return Promise.reject(new InvalidRequestException(errors));
    }

    const client = await this.clientRepository.findOne({
      where:
        {
          client_id: clientId
        }
    });
    if (client === null || client.length === 0) {
      return Promise.reject(new ClientNotFoundException(`Clients ${clientId} not found`));
    }

    return client;
  }

  async findOneClientById(clientId) {
    this.log.info(`ClientService: find one client ${clientId} by client id`);
    // validate here
    const errors = [];
    if (errors.length !== 0) {
      return Promise.reject(new InvalidRequestException(errors));
    }

    const client = await this.clientRepository.findOne({
      where:
        {
          id: clientId
        }
    });
    if (client === null || client.length === 0) {
      return Promise.reject(new ClientNotFoundException(`Clients ${clientId} not found`));
    }

    return client;
  }
}
