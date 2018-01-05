import { expect } from 'chai';
// Using Expect style
const sequalize = require('./sequalize-mock');
import {populateClients, populateUsers} from './mockdb';

import UserService from './../dist/services/users.service';
import ClientService from './../dist/services/client.service';
import { getActiveLogger } from '../dist/utils/winston';

const userService = new UserService(sequalize.User, sequalize.Credentials, getActiveLogger());
const clientService = new ClientService(sequalize.Client, userService, getActiveLogger());

describe('Testing Client Service', () => {
  beforeEach(async () => {

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
        client_id: 'client_id4',
        name: 'frontend1',
        secret: 'client_secret',
        userId: 1
      };

      // Create client for userId 1
      const newClient = await clientService.createClient(client);
      expect(newClient.dataValues).to.have.keys([ 'id', 'createdAt', 'updatedAt', 'client_id', 'name', 'secret', 'userId']);
      expect(newClient.client_id).to.equal(client.client_id);
      expect(newClient.name).to.equal(client.name);
      expect(newClient.secret).to.equal(client.secret);
      expect(newClient.userId).to.equal(1);
    });

    it('should not create a client if the client_id is not unique', async () => {
      const client = {
        client_id: 'client_id2',
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
        expect(err.field).to.be.an('array').that.deep.include('client_id');
      }
    });

    it('should not create a client for a user that does not exist', async () => {
      const client = {
        client_id: 'client_id6',
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
      const client = await clientService.findOneClientByClientId('client_id2');
      expect(client.client_id).to.equal('client_id2');
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
      expect(client.client_id).to.equal('client_id');
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