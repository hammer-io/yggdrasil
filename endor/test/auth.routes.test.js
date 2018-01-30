let chai = require('chai');
let chaiHttp = require('chai-http');

// Using Expect style

import server from './../src/index';
import * as apiUtil from './util/api.util';
import { defineTables } from '../src/db/init_database';
import {  populateClients, populateUsers, populateAccessCodes, populateTokens } from '../src/db/import_test_data';

chai.use(chaiHttp);
const should = chai.should();
const expect = chai.expect;

describe('Testing Auth Endpoints', () => {
  beforeEach(async () => {
    await defineTables();
    await populateUsers();
    await populateClients();
    await populateAccessCodes();
    await populateTokens();
  });

  describe('POST /oauth2/token', () => {
    it('should return a new token for the user', (done) => {
      const req = {
        "code": "randomValue",
        "grant_type": "authorization_code",
        "redirect_uri": "http://localhost:3000/api/v1/oauth2/authorize/successRedirect"
      };
      chai.request(server)
        .post(`${apiUtil.API}/oauth2/token`)
        .send(req)
        .end((err, res) => {
          res.should.have.status(200);
          expect(err).to.be.a('null');
          expect(res.body).to.be.an('object');
          expect(res.body.access_token.expired).to.equal(false);
          expect(res.body.access_token.value).to.not.be.an('undefined');
          expect(res.body.access_token.userId).to.equal(3);
          expect(res.body.token_type).to.equal('Bearer');
          done();
        });
    });

    it('should return a new token for the user', (done) => {
      const req = {
        "code": "incorrectrandomValue",
        "grant_type": "authorization_code",
        "redirect_uri": "http://localhost:3000/api/v1/oauth2/authorize/successRedirect"
      };
      chai.request(server)
        .post(`${apiUtil.API}/oauth2/token`)
        .send(req)
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });

    it('should return a new token for the user', (done) => {
      const req = {
        username: "jreach",
        password: "plaintext1",
        grant_type: "password"
      };
      chai.request(server)
        .post(`${apiUtil.API}/oauth2/token`)
        .send(req)
        .end((err, res) => {
          res.should.have.status(200);
          expect(err).to.be.a('null');
          expect(res.body).to.be.an('object');
          expect(res.body.access_token.expired).to.equal(false);
          expect(res.body.access_token.value).to.not.be.an('undefined');
          expect(res.body.access_token.userId).to.equal(3);
          expect(res.body.token_type).to.equal('Bearer');
          done();
        });
    });

    it('should not return a token if the password in incorrect', (done) => {
      const req = {
        username: "jreach",
        password: "plaintext2",
        grant_type: "password"
      };
      chai.request(server)
        .post(`${apiUtil.API}/oauth2/token`)
        .send(req)
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });

    it('should not return a token if the username does not exist', (done) => {
      const req = {
        username: "bad_username",
        password: "plaintext1",
        grant_type: "password"
      };
      chai.request(server)
        .post(`${apiUtil.API}/oauth2/token`)
        .send(req)
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
  });

  describe('POST /auth/register', () => {
    it('should create a user and a token for that user', (done) => {
      const req = {
        username: 'userNamedTyrr',
        email: 'tyr@gmail.com',
        password: 'plaintext1'
      };
      chai.request(server)
        .post(`${apiUtil.API}/auth/register`)
        .send(req)
        .end((err, res) => {
          expect(err).to.be.an('null');
          res.should.have.status(200);
          expect(res.body.user).to.be.an('object');
          expect(res.body.user.username).to.equal(req.username);
          expect(res.body.user.email).to.equal(req.email);
          expect(res.body.user.password).to.be.an('undefined');
          expect(res.body.token).to.be.an('object');
          expect(res.body.token.userId).to.equal(res.body.user.id);
          expect(res.body.token.value).to.be.an('string');
          done();
        });
    });

    it('should not create a new user if email is not present', (done) => {
      const req = {
        username: 'userNamedTyrr',
        password: 'plaintext1'
      };
      chai.request(server)
        .post(`${apiUtil.API}/auth/register`)
        .send(req)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('should not create a new user if not username not is present', (done) => {
      const req = {
        email: 'tyr@gmail.com',
        password: 'plaintext1'
      };
      chai.request(server)
        .post(`${apiUtil.API}/auth/register`)
        .send(req)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe('GET /auth/token', () => {
    it('should return a status 200 if the authorization token is valid', (done) => {
      chai.request(server)
        .get(`${apiUtil.API}/auth/token`)
        .set('Authorization', apiUtil.bearerAuthorization('longRandomTokenValue'))
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('should return a status 401 if the authorization token is invalid', (done) => {
      chai.request(server)
        .get(`${apiUtil.API}/auth/token`)
        .set('Authorization', apiUtil.bearerAuthorization('incorrectLongRandomTokenValue'))
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
  });
});
