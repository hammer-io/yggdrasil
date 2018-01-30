let chai = require('chai');
let chaiHttp = require('chai-http');

import server from './../src/index';
import * as apiUtil from './util/api.util';
import { defineTables } from '../src/db/init_database';
import { populateClients, populateUsers } from '../src/db/import_test_data';

chai.use(chaiHttp);
const should = chai.should();
const expect = chai.expect;

describe('Testing Client Endpoints', () => {
  beforeEach(async () => {
    await defineTables();
    await populateUsers();
    await populateClients();
  });

  describe('POST /clients', () => {
    it('should return the newly created client for the user', (done) => {
      const client = {
        "name": "endor_frontend",
        "clientId": "unique_client_id",
        "secret": "client_secret"
      };
      chai.request(server)
        .post(`${apiUtil.API}/clients`)
        .set('Authorization',apiUtil.basicAuthorization('jreach', 'plaintext1'))
        .send({ client })
        .end((err, res) => {
          res.should.have.status(200);
          expect(err).to.be.a('null');
          expect(res.body).be.an('object');
          expect(res.body.name).to.equal(client.name);
          expect(res.body.clientId).to.equal(client.clientId);
          expect(res.body.secret).to.equal(client.secret);
          done();
        })
    });
  });
});