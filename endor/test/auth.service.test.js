import { expect } from 'chai';
// Using Expect style
const sequelize = require('../src/db/sequelize');
import { defineTables } from '../src/db/init_database';
import {
  populateClients,
  populateUsers,
  populateAccessCodes,
  populateTokens
} from '../src/db/import_test_data';
import dbTestConfig from '../dbTestConfig.json';

import AuthService from './../src/services/auth.service';
import { getMockLogger } from './mockLogger';

// Initialize Sequelize with sqlite for testing
if (!sequelize.isInitialized()) {
  sequelize.initSequelize(
    dbTestConfig.database,
    dbTestConfig.username,
    dbTestConfig.password,
    dbTestConfig.options
  );
}

const authService = new AuthService(sequelize.Token, sequelize.AccessCode, getMockLogger());


describe('Testing Auth Service', () => {
  beforeEach(async () => {
    await defineTables();
    await populateUsers();
    await populateClients();
    await populateAccessCodes();
    await populateTokens();

  });

  describe('should find an access code when a valid, correct value is given', async () => {
    it('should find the correct access code by value', async () => {
      const accessCodeValue = 'randomValue';
      const accessCode = await authService.findOneCodeByValue(accessCodeValue);
      expect(accessCode.value).to.equal(accessCodeValue);
      expect(accessCode.userId).to.equal(3);
      expect(accessCode.redirectURI).to.equal('http://localhost:3000/api/v1/oauth2/authorize/successRedirect');
    });

    it('should not find a code if the value does not exist', async () => {
      try {
        const accessCode = await authService.findOneCodeByValue('randomIncorrectValue');
        expect(accessCode).to.be.an('undefined');
      } catch (err) {
        expect(err.type).to.equal('Forbidden');
      }
    });
  });

  describe('should create an access token with the correct information', async () => {
    it('should create an access token given a valid user id', async () => {
      const token = await authService.createToken(1);
      expect(token).to.be.an('object');
      expect(token.expired).to.equal(false);
      expect(token.userId).to.equal(1);
    });

    it('should not create a token if the user id does not exist', async () => {
      try {
        const token = await authService.createToken(1000);
        expect(token).to.be.an('undefined');
      } catch (err) {
        expect(err.type).to.equal('Invalid Request')
      }
    });
  });

  describe('should be able to find a token by its value', async () => {
    it('should find a newly created token by its value', async () => {
      const token = await authService.findOneTokenByValue('longRandomTokenValue');
      expect(token.value).to.equal('longRandomTokenValue');
      expect(token.userId).to.equal(3);
      expect(token.expired).to.equal(false);
    });

    it('should throw an error if the token value does not exist', async () => {
      try {
        const token = await authService.findOneTokenByValue('thisValueDoesNotExist');
        expect(token).to.be.an('undefined');
      } catch (err) {
        expect(err.type).to.equal('Forbidden');
      }
    });
  });

  describe('should be able to create a new code given the correct information', async () => {
    it('should create a new code', async () => {
      const redirectURI = 'http://localhost:3000/api/v1/oauth2/authorize/successRedirect';
      const accessCode = await authService.createCode(
        redirectURI,
        1
      );
      expect(accessCode).to.be.an('object');
      expect(accessCode.redirectURI).to.equal(redirectURI);
      expect(accessCode.userId).to.equal(1);
    });

    it('should not create a new code if the userIds are invalid', async () => {
      try {
        const redirectURI = 'http://localhost:3000/api/v1/oauth2/authorize/successRedirect';
        const accessCode = await authService.createCode(
          redirectURI,
          1000
        );
        expect(accessCode).to.be.an('undefined');
      } catch (err) {
        expect(err.type).to.equal('Invalid Request');
      }
    });
  });

  describe('should delete code by value', async () => {
    it('should delete a code with the given value', async () => {
      const code = await authService.deleteCode('randomValue');
      expect(code).to.equal(1);
    });

    it('should delete a code with the given value', async () => {
      try {
        const code = await authService.deleteCode('incorrectRandomValue');
        expect(code).to.be.an('undefined');
      } catch (err) {
        expect(err.type).to.equal('Forbidden');
      }
    });
  });
});