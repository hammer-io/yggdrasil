import { expect } from 'chai';
// Using Expect style
const sequalize = require('../src/db/sequelize');
import { defineTables, populateClients, populateUsers} from './setupMockDB';

import UserService from './../dist/services/users.service';
import ClientService from './../dist/services/client.service';
import { getActiveLogger } from '../dist/utils/winston';

// Initialize Sequelize with sqlite for testing
sequalize.initSequelize(
  'database',
  'root',
  'root', {
    dialect: 'sqlite',
    logging: false
  }
);

const userService = new UserService(sequalize.User, sequalize.Credentials, getActiveLogger());
const clientService = new ClientService(sequalize.Client, userService, getActiveLogger());

describe('Testing Client Service', () => {
  beforeEach(async () => {
    await defineTables();
    await populateUsers();
    await populateClients();

  });


  describe('get all clients by userId', async () => {
    it('should return all clients of userId', async () => {
      const clients = await clientService.findAllClients(3);
      expect(clients).to.be.an('array');
      expect(clients.length).to.equal(2);
    });
    it('should throw an exception if a user does not have any clients', async () => {
      try {
        const clients = await clientService.findAllClients(2);
        expect(clients).to.be.an('undefined'); // An exception should be thrown, so this should not execute
      } catch (err) {
        expect(err.type).to.equal('Not Found');
        expect(err.status).to.equal(404);
      }
    });
  });

  describe('create a client for a specific user', async () => {
    it('should create a client given a unique clientId for a user that exists', async () => {
      const client = {
        clientId: 'clientId4',
        name: 'frontend1',
        secret: 'client_secret',
        userId: 1
      };

      // Create client for userId 1
      const newClient = await clientService.createClient(client);
      expect(newClient.dataValues).to.have.keys([ 'id', 'createdAt', 'updatedAt', 'clientId', 'name', 'secret', 'userId']);
      expect(newClient.clientId).to.equal(client.clientId);
      expect(newClient.name).to.equal(client.name);
      expect(newClient.secret).to.equal(client.secret);
      expect(newClient.userId).to.equal(1);
    });

    it('should not create a client if the clientId is not unique', async () => {
      const client = {
        clientId: 'clientId2',
        name: 'frontend1',
        secret: 'client_secret',
        userId: 1
      };

      try {
        // Create client for userId 1
        const createdClient = await clientService.createClient(client);
        expect(createdClient).to.be.an('undefined'); // An exception should be thrown, so this should not execute
      } catch (err) {
        expect(err.type).to.equal('NonUniqueError');
        expect(err.fields).to.be.an('array').that.deep.include('clientId');
      }
    });

    it('should not create a client for a user that does not exist', async () => {
      const client = {
        clientId: 'clientId6',
        name: 'frontend1',
        secret: 'client_secret',
        userId: 1000
      };

      try {
        // Create a client for user 1000
        const createdClient = await clientService.createClient(client);
        expect(createdClient).to.be.an('undefined'); // An exception should be thrown, so this should not execute
      } catch (err) {
        expect(err.type).to.equal('Not Found');
      }
    });
  });

  describe('should find a client by id', async () => {
    it('when given an existing client id, find the correct client', async () => {
      const client = await clientService.findOneClientByClientId('clientId2');
      expect(client.clientId).to.equal('clientId2');
      expect(client.name).to.equal('endor_frontend1');
      expect(client.secret).to.equal('client_secret');
      expect(client.userId).to.equal(4);
    });

    it('when given a non existing client', async () => {
      try {
        const client = await clientService.findOneClientByClientId('Non existing client id');
        expect(client).to.be.an('undefined');
      } catch (err) {
        expect(err.type).to.equal('Not Found');
      }
    });
  });

  describe('should find one client by its id', async () => {
    it('when given an existing id, find the correct client', async () => {
      const client = await clientService.findOneClientById(1);
      expect(client.name).to.equal('endor_frontend1');
      expect(client.clientId).to.equal('clientId');
      expect(client.secret).to.equal('client_secret');
      expect(client.userId).to.equal(3);
    });

    it('when given an non existing id, throw a Not Found Exception', async () => {
      try {
        const client = await clientService.findOneClientById(1000);
        expect(client).to.be.an('undefined');
      } catch (err) {
        expect(err.type).equal('Not Found');
      }
    });
  });
});