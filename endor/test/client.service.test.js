import { expect } from 'chai';
// Using Expect style
const sequalize = require('./sequalize-mock');

import UserService from './../dist/services/users.service';
import ClientService from './../dist/services/client.service';
import { getActiveLogger } from '../dist/utils/winston';

describe('Testing Client Service', () => {
  beforeEach(async () => {
    await sequalize.User.sync({force: true});
    await sequalize.Tool.sync({force: true});
    await sequalize.Project.sync({force: true});
    await sequalize.ProjectOwner.sync({force: true});
    await sequalize.ProjectContributor.sync({force: true});

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


  });
});