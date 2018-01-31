import chai from 'chai';
import chaiHttp from 'chai-http';

import {defineTables, populateTools} from '../src/db/init_database';
import { populateUsers, populateProjects } from '../src/db/import_test_data';
// Using Expect style
const sequelize = require('../src/db/sequelize');
import * as apiUtil from './util/api.util';
import server from '../src';

chai.use(chaiHttp);
const should = chai.should();
const expect = chai.expect;

describe('Testing Owner Routes', () => {
  beforeEach(async () => {
    await defineTables();
    await populateUsers();
    await populateTools();
    await populateProjects();
  });

  describe('POST /projects/:projectId/owners/:user', () => {
    it('should return the project with the newly added user among the owners', (done) => {
      chai.request(server)
        .post(`${apiUtil.API}/projects/2/owners/3`)
        .set('Authorization', apiUtil.basicAuthorization('johnnyb', 'plaintext1'))
        .send()
        .end((err, res) => {
          res.should.have.status(201);
          const projectOwners = res.body;
          expect(projectOwners.filter(owner => owner.id === 3).length).to.equal(1);
          done();
        });
    });

    it('should not return the project if the authenticated user is not among the project owners', (done) => {
      chai.request(server)
        .post(`${apiUtil.API}/projects/2/owners/3`)
        .set('Authorization', apiUtil.basicAuthorization('jreach', 'plaintext1'))
        .send()
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it('should return a status 401 if there is no authorization header', (done) => {
      chai.request(server)
        .post(`${apiUtil.API}/projects/2/owners/3`)
        .send()
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  describe('DELETE /projects/:projectId/owners/:user', () => {
    it('should return a status of 204', (done) => {
      chai.request(server)
        .delete(`${apiUtil.API}/projects/2/owners/2`)
        .set('Authorization', apiUtil.basicAuthorization('johnnyb', 'plaintext1'))
        .send()
        .end((err, res) => {
          res.should.have.status(204);
          done();
        });
    });

    it('should return a status of 401 if the user is not an owner', (done) => {
      chai.request(server)
        .delete(`${apiUtil.API}/projects/2/owners/2`)
        .set('Authorization', apiUtil.basicAuthorization('jreach', 'plaintext1'))
        .send()
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it('should return a status 401 if there is no authorization header', (done) => {
      chai.request(server)
        .post(`${apiUtil.API}/projects/2/owners/2`)
        .send()
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });
});