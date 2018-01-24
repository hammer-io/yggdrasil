import { expect } from 'chai';
// Using Expect style
const sequelize = require('../src/db/sequelize');
import { defineTables } from '../src/db/init_database';
import { populateClients, populateUsers } from '../src/db/import_test_data';

import ClientService from './../src/services/client.service';
import { getMockLogger } from './mockLogger';

// Initialize Sequelize with sqlite for testing
sequelize.initSequelize(
  'database',
  'root',
  'root', {
    dialect: 'sqlite',
    logging: false
  }
);

const clientService = new ClientService(sequelize.Client, getMockLogger());

describe('Testing Client Service', () => {
  beforeEach(async () => {
    await defineTables();
    await populateUsers();
    await populateClients();
  });

  describe('should create a client for a specific user', async () => {
    it('should create a client given a unique clientId for a user that exists', async () => {
      const client = {
        clientId: 'clientId4',
        name: 'frontend1',
        secret: 'client_secret'
      };

      // Create client for userId 1
      const newClient = await clientService.createClient(client);
      expect(newClient.dataValues).to.have.keys([ 'id', 'createdAt', 'updatedAt', 'clientId', 'name', 'secret']);
      expect(newClient.clientId).to.equal(client.clientId);
      expect(newClient.name).to.equal(client.name);
      expect(newClient.secret).to.equal(client.secret);
    });

    it('should not create a client if the clientId is not unique', async () => {
      const client = {
        clientId: 'clientId2',
        name: 'frontend1',
        secret: 'client_secret'
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
  });

  describe('should find a client by id', async () => {
    it('when given an existing client id, find the correct client', async () => {
      const client = await clientService.findOneClientByClientId('clientId2');
      expect(client.clientId).to.equal('clientId2');
      expect(client.name).to.equal('endor_frontend1');
      expect(client.secret).to.equal('client_secret');
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