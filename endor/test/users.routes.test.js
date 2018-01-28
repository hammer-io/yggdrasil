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

describe('Testing User Endpoints', () => {
  beforeEach(async () => {
    await defineTables();
    await populateUsers();
    await populateClients();
    await populateAccessCodes();
    await populateTokens();
  });

  describe('GET /users', () => {
    it('should return all users', (done) => {
      chai.request(server)
        .get(`${apiUtil.API}/users`)
        .set('Authorization', apiUtil.basicAuthorization('jreach', 'plaintext1'))
        .send()
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body.length).to.equal(5);
          done();
          // [ { id: 1,
          //   username: 'BobSagat',
          //   email: 'Bob@AFV.com',
          //   firstName: 'Bob',
          //   lastName: 'Sagat',
          //   createdAt: '2018-01-28T23:49:19.394Z',
          //   updatedAt: '2018-01-28T23:49:19.394Z' },
          //   { id: 2,
          //     username: 'globalwarmingguy56',
          //     email: 'Al@saveourplanet.com',
          //     firstName: 'Al',
          //     lastName: 'Gore',
          //     createdAt: '2018-01-28T23:49:19.394Z',
          //     updatedAt: '2018-01-28T23:49:19.394Z' },
          //   { id: 3,
          //     username: 'jreach',
          //     email: 'jreach@gmail.com',
          //     firstName: 'Jack',
          //     lastName: 'Reacher',
          //     createdAt: '2018-01-28T23:49:19.394Z',
          //     updatedAt: '2018-01-28T23:49:19.394Z' },
          //   { id: 4,
          //     username: 'johnnyb',
          //     email: 'jbravo@cartoonnetwork.com',
          //     firstName: 'Johnny',
          //     lastName: 'Bravo',
          //     createdAt: '2018-01-28T23:49:19.394Z',
          //     updatedAt: '2018-01-28T23:49:19.394Z' },
          //   { id: 5,
          //     username: 'buddy',
          //     email: 'buddy@carnegiehall.org',
          //     firstName: 'Buddy',
          //     lastName: 'Rich',
          //     createdAt: '2018-01-28T23:49:19.394Z',
          //     updatedAt: '2018-01-28T23:49:19.394Z' } ]

        })
    });
  });
});
