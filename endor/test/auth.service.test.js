import { expect } from 'chai';
// Using Expect style
const sequalize = require('./sequalize-mock');
import {
  defineTables,
  populateClients,
  populateUsers,
  populateAccessCodes,
  populateTokens
} from './setupMockDB';

import AuthService from './../dist/services/auth.service';
import { getActiveLogger } from '../dist/utils/winston';

const authService = new AuthService(sequalize.Token, sequalize.AccessCode, getActiveLogger());


describe('Testing Client Service', () => {
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
      expect(accessCode.clientId).to.equal(1);
      expect(accessCode.userId).to.equal(3);
      expect(accessCode.redirectURI).to.equal('http://localhost:3000/api/v1/oauth2/authorize/successRedirect');
    });

    it('should not find a code if the value does not exist', async () => {
      try {
        const accessCode = await authService.findOneCodeByValue('randomIncorrectValue');
        expect(accessCode).to.be.an('undefined');
      } catch (err) {
        expect(err.type).to.equal('Not Found');
      }
    });
  });

  describe('should create an access token with the correct information', async () => {
    it('should create an access token given a valid client id and user id', async () => {
      // const reqBody = {
      //   // code: "randomValue",
      //   // grant_type: "authorization_code",
      //   // redirect_uri: "http://localhost:3000/api/v1/oauth2/authorize/successRedirect"
      // };
      const token = await authService.createToken(1, 3);
      expect(token).to.be.an('object');
      expect(token.expired).to.equal(false);
      expect(token.clientId).to.equal(1);
      expect(token.userId).to.equal(3);
    });

    it('should not create a token if the user id/client combo does not exist', async () => {
      try {
        const token = await authService.createToken(1, 1000);
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
      expect(token.clientId).to.equal(1);
      expect(token.userId).to.equal(3);
      expect(token.expired).to.equal(false);
    });

    it('should throw an error if the token value does not exist', async () => {
      try {
        const token = await authService.findOneTokenByValue('thisValueDoesNotExist');
        expect(token).to.be.an('undefined');
      } catch (err) {
        expect(err.type).to.equal('Not Found');
      }
    });
  });

  describe('should be able to create a new code given the correct information', async () => {
    it('should create a new code', async () => {
      const redirectURI = 'http://localhost:3000/api/v1/oauth2/authorize/successRedirect';
      const accessCode = await authService.createCode(
        3,
        redirectURI,
        1
      );
      expect(accessCode).to.be.an('object');
      expect(accessCode.redirectURI).to.equal(redirectURI);
      expect(accessCode.clientId).to.equal(3);
      expect(accessCode.userId).to.equal(1);
    });

    it('should not create a new code if the clientId/userIds are invalid', async () => {
      try {
        const redirectURI = 'http://localhost:3000/api/v1/oauth2/authorize/successRedirect';
        const accessCode = await authService.createCode(
          3,
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
        expect(err.type).to.equal('Not Found');
      }
    });
  });
});