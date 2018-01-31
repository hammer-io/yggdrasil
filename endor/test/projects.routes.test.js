import chai from 'chai';
import chaiHttp from 'chai-http';

import {defineTables, populateTools} from '../src/db/init_database';
import { populateUsers, populateProjects } from '../src/db/import_test_data';
// Using Expect style
const sequelize = require('../src/db/sequelize');
import dbTestConfig from '../dbTestConfig.json';
import UserService from './../src/services/users.service';
import { getMockLogger } from './mockLogger';
import * as apiUtil from './util/api.util';
import server from '../src';

chai.use(chaiHttp);
const should = chai.should();
const expect = chai.expect;

// Initialize Sequelize with sqlite for testing
if (!sequelize.isInitialized()) {
  sequelize.initSequelize(
    dbTestConfig.database,
    dbTestConfig.username,
    dbTestConfig.password,
    dbTestConfig.options
  );
}

describe('Testing Project Routes', () => {
  beforeEach(async () => {
    await defineTables();
    await populateUsers();
    await populateTools();
    await populateProjects();
  });

  describe('PATCH /projects/:projectId', () => {
    it('should update the specified project', (done) => {
      const body = {
        version: '5.0.6'
      };

      chai.request(server)
        .patch(`${apiUtil.API}/projects/2`)
        .set('Authorization', apiUtil.basicAuthorization('johnnyb', 'plaintext1'))
        .send(body)
        .end((err, res) => {
          res.should.have.status(200);
          const project = res.body;
          expect(project.projectName).to.equal('hammer-io');
          expect(project.description).to.equal('Hit it with a hammer!');
          expect(project.version).to.equal('5.0.6');
          expect(project.license).to.equal('MIT');
          expect(project.authors).to.equal('Jack');
          done();
        });
    });

    it('should not update the specified project if the authenticated user is not an owner', (done) => {
      const body = {
        version: '5.0.6'
      };

      chai.request(server)
        .patch(`${apiUtil.API}/projects/2`)
        .set('Authorization', apiUtil.basicAuthorization('jreach', 'plaintext1'))
        .send(body)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it('should not update the specified project if there is not an authenticated user', (done) => {
      const body = {
        version: '5.0.6'
      };

      chai.request(server)
        .patch(`${apiUtil.API}/projects/2`)
        .send(body)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  describe('POST /user/projects', () => {
    it('should create a new project for the authenticated user', (done) => {
      const body = {
        projectName: 'Rock Opera',
        description: 'A new Rock Opera',
        version: '0.0.0',
        license: 'MIT',
        authors: 'None'
      };
      chai.request(server)
        .post(`${apiUtil.API}/user/projects`)
        .set('Authorization', apiUtil.basicAuthorization('jreach', 'plaintext1'))
        .send(body)
        .end((err, res) => {
          res.should.have.status(200);
          const project = res.body;
          expect(project.projectName).to.equal('Rock Opera');
          done();
        })
    });
  });

  describe('DELETE /projects/:projectId', () => {
    it('should delete a project and return 204 if the user has owner level permissions', (done) => {
      chai.request(server)
        .delete(`${apiUtil.API}/projects/2`)
        .set('Authorization', apiUtil.basicAuthorization('johnnyb', 'plaintext1'))
        .send()
        .end((err, res) => {
          res.should.have.status(204);
          done();
        });
    });

    it('should not delete a project and return 204 if the user does not have owner level permissions', (done) => {
      chai.request(server)
        .delete(`${apiUtil.API}/projects/2`)
        .set('Authorization', apiUtil.basicAuthorization('jreach', 'plaintext1'))
        .send()
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it('should not delete a project and return 403 if the user is not authenticated', (done) => {
      chai.request(server)
        .delete(`${apiUtil.API}/projects/2`)
        .send()
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });
});