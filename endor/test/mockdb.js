// Using Expect style
const sequalize = require('./sequalize-mock');
import bcrypt from 'bcrypt';

export async function populateUsers() {
  await sequalize.User.sync({ force: true });
  await sequalize.Credentials.sync({ force: true });
  await sequalize.Tool.sync({ force: true });
  await sequalize.Project.sync({ force: true });
  await sequalize.ProjectOwner.sync({ force: true });
  await sequalize.ProjectContributor.sync({ force: true });
  await sequalize.Client.sync({ force: true });
  await sequalize.AccessCode.sync({ force: true });
  await sequalize.Token.sync({ force: true });

  await sequalize.User.bulkCreate([
    {
      username: 'BobSagat',
      email: 'Bob@AFV.com',
      firstName: 'Bob',
      lastName: 'Sagat'
    },
    {
      username: 'globalwarmingguy56',
      email: 'Al@saveourplanet.com',
      firstName: 'Al',
      lastName: 'Gore'
    },
    {
      username: 'jreach',
      email: 'jreach@gmail.com',
      firstName: 'Jack',
      lastName: 'Reacher'
    },
    {
      username: 'johnnyb',
      email: 'jbravo@cartoonnetwork.com',
      firstName: 'Johnny',
      lastName: 'Bravo'
    }
  ]);

  const user1 = await sequalize.User.findOne({
    where: { username: 'johnnyb' }
  });
  const user2 = await sequalize.User.findOne({
    where: { username: 'globalwarmingguy56' }
  });
  const user3 = await sequalize.User.findOne({
    where: { username: 'jreach' }
  });
  const user4 = await sequalize.User.findOne({
    where: { username: 'BobSagat' }
  });
  const salt = await bcrypt.genSalt(10);
  const pass = await bcrypt.hash('plaintext1', salt);
  const cred1 = await sequalize.Credentials.create({
    password: pass
  });
  const cred2 = await sequalize.Credentials.create({
    password: pass
  });
  const cred3 = await sequalize.Credentials.create({
    password: pass
  });
  const cred4 = await sequalize.Credentials.create({
    password: pass
  });
  await cred1.setUser(user1);
  await cred2.setUser(user2);
  await cred3.setUser(user3);
  await cred4.setUser(user4);
}

export async function populateClients() {
  await sequalize.Client.bulkCreate([
    {
      name: "endor_frontend1",
      client_id: "client_id",
      secret: "client_secret",
      userId: 3
    },
    {
      name: "endor_frontend1",
      client_id: "client_id1",
      secret: "client_secret",
      userId: 3
    },
    {
      name: "endor_frontend1",
      client_id: "client_id2",
      secret: "client_secret",
      userId: 4
    }
  ]);
}

export async function populateAccessCodes() {
  await sequalize.AccessCode.bulkCreate([
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
  await sequalize.Token.bulkCreate([
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