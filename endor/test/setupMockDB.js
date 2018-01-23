// Using Expect style
const sequelize = require('../src/db/sequelize');
import * as initDatabase from '../src/db/init_database';
import * as importTestData from '../src/db/import_test_data';

export async function defineTables() {
  return initDatabase.defineTables();
}

export async function populateTools() {
  return initDatabase.populateTools();
}

export async function populateUsers() {
  return importTestData.populateUsers();
}

export async function populateClients() {
  await sequelize.Client.bulkCreate([
    {
      name: "endor_frontend1",
      clientId: "clientId",
      secret: "client_secret",
      userId: 3
    },
    {
      name: "endor_frontend1",
      clientId: "clientId1",
      secret: "client_secret",
      userId: 3
    },
    {
      name: "endor_frontend1",
      clientId: "clientId2",
      secret: "client_secret",
      userId: 4
    }
  ]);
}

export async function populateProjects() {
  return importTestData.populateProjects();
}

export async function populateAccessCodes() {
  await sequelize.AccessCode.bulkCreate([
    {
      value: 'randomValue',
      redirectURI: 'http://localhost:3000/api/v1/oauth2/authorize/successRedirect',
      userId: 3,
      clientId: 1
    },
    {
      value: 'randomValueAgain',
      redirectURI: 'http://localhost:3000/api/v1/oauth2/authorize/successRedirect',
      userId: 4,
      clientId: 3
    }
  ]);
}

export async function populateTokens() {
  await sequelize.Token.bulkCreate([
    {
      value: 'longRandomTokenValue',
      expired: false,
      userId: 3,
      clientId: 1
    },
    {
      value: 'anotherLongRandomUnpredictableTokenValue',
      expired: false,
      userId: 3,
      clientId: 1
    }
  ]);
}