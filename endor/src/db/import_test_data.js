/* eslint-disable import/no-unresolved */
import bcrypt from 'bcrypt';
import sequelize from './sequelize';

// This file fills the database with data for testing

export async function populateUsers() {
  await sequelize.User.bulkCreate([
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
    },
    {
      username: 'buddy',
      email: 'buddy@carnegiehall.org',
      firstName: 'Buddy',
      lastName: 'Rich'
    }
  ]);

  const user1 = await sequelize.User.findOne({
    where: { username: 'johnnyb' }
  });
  const user2 = await sequelize.User.findOne({
    where: { username: 'globalwarmingguy56' }
  });
  const user3 = await sequelize.User.findOne({
    where: { username: 'jreach' }
  });
  const user4 = await sequelize.User.findOne({
    where: { username: 'BobSagat' }
  });
  const salt = await bcrypt.genSalt(10);
  const pass = await bcrypt.hash('plaintext1', salt);
  const cred1 = await sequelize.Credentials.create({
    password: pass
  });
  const cred2 = await sequelize.Credentials.create({
    password: pass
  });
  const cred3 = await sequelize.Credentials.create({
    password: pass
  });
  const cred4 = await sequelize.Credentials.create({
    password: pass
  });
  await cred1.setUser(user1);
  await cred2.setUser(user2);
  await cred3.setUser(user3);
  await cred4.setUser(user4);
}

export async function populateClients() {
  await sequelize.Client.bulkCreate([
    {
      name: 'endor_frontend1',
      clientId: 'clientId',
      secret: 'client_secret'
    },
    {
      name: 'endor_frontend1',
      clientId: 'clientId1',
      secret: 'client_secret'
    },
    {
      name: 'endor_frontend1',
      clientId: 'clientId2',
      secret: 'client_secret'
    }
  ]);
}

export async function populateProjects() {
  const project1 = await sequelize.Project.create({
    projectName: 'TMNT',
    description: 'You gotta know what a crumpet is to understand cricket!',
    version: '1.2.3',
    license: 'MIT',
    authors: 'Casey Jones, Raphael'
  });
  const project2 = await sequelize.Project.create({
    projectName: 'hammer-io',
    description: 'Hit it with a hammer!',
    version: '1.2.3',
    license: 'MIT',
    authors: 'Jack'
  });
  await sequelize.Project.create({
    projectName: 'drumitdown',
    description: 'Let us drum it down for you',
    version: '3.2.1',
    license: 'MIT',
    authors: 'Krash'
  });

  // Add project owners
  const user1 = await sequelize.User.findOne({
    where: { username: 'johnnyb' }
  });
  const user2 = await sequelize.User.findOne({
    where: { username: 'globalwarmingguy56' }
  });
  const user3 = await sequelize.User.findOne({
    where: { username: 'jreach' }
  });
  const user4 = await sequelize.User.findOne({
    where: { username: 'BobSagat' }
  });
  await project1.addOwners(user1);
  await project2.addOwners([user1, user2, user4]);
  // Another way to do it (might be useful later)
  // await user2.addProjectsOwned(project);

  // Add project contributors
  await project1.addContributors([user2, user3, user4]);
  await project2.addContributors([user3]);

  // Add tooling
  const depTools = await sequelize.Tool.findAll({
    where: { toolType: sequelize.ToolType.DEPLOYMENT }
  });
  await project1.setDeploymentTool(depTools[0]);
  const ciTools = await sequelize.Tool.findAll({
    where: { toolType: sequelize.ToolType.CONTINUOUS_INTEGRATION }
  });
  await project1.setContinuousIntegrationTool(ciTools[0]);
}

export async function populateInvites() {
  const userJreach = await sequelize.User.findOne({
    where: { username: 'jreach' }
  });
  const userBuddy = await sequelize.User.findOne({
    where: { username: 'buddy' }
  });
  const projectHammerIo = await sequelize.Project.findOne({
    where: { projectName: 'hammer-io' }
  });
  const projectDrumItDown = await sequelize.Project.findOne({
    where: { projectName: 'drumitdown' }
  });

  // Jreach invited to hammer-io
  await sequelize.Invite.create({
    status: sequelize.InviteStatus.OPEN,
    userInvitedId: userJreach.id,
    projectInvitedToId: projectHammerIo.id,
    daysFromCreationUntilExpiration: 30
  });
  // Buddy invited to hammer-io and drumitdown, but he declined
  await sequelize.Invite.create({
    status: sequelize.InviteStatus.DECLINED,
    userInvitedId: userBuddy.id,
    projectInvitedToId: projectHammerIo.id,
    daysFromCreationUntilExpiration: 15
  });
  await sequelize.Invite.create({
    // status: sequelize.InviteStatus.OPEN,    -- Defaults to OPEN
    userInvitedId: userBuddy.id,
    projectInvitedToId: projectDrumItDown.id
    // daysFromCreationUntilExpiration: 30     -- Default to 30
  });
}

export async function populateAccessCodes() {
  await sequelize.AccessCode.bulkCreate([
    {
      value: 'randomValue',
      redirectURI: 'http://localhost:3000/api/v1/oauth2/authorize/successRedirect',
      userId: 3
    },
    {
      value: 'randomValueAgain',
      redirectURI: 'http://localhost:3000/api/v1/oauth2/authorize/successRedirect',
      userId: 4
    }
  ]);
}

export async function populateTokens() {
  await sequelize.Token.bulkCreate([
    {
      value: 'longRandomTokenValue',
      expired: false,
      userId: 3
    },
    {
      value: 'anotherLongRandomUnpredictableTokenValue',
      expired: false,
      userId: 3
    }
  ]);
}

async function populateTestData() {
  await populateUsers();
  await populateProjects();
  await populateInvites();
}


/**
 * ---------------------------- MAIN ----------------------------
 * The main function only gets run if this file is run as a script
 */
function main() {
  // eslint-disable-next-line global-require
  const dbConfig = require('../../dbConfig.json');

  // First, we need to initialize the data model
  sequelize.initSequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    dbConfig.options
  );

  // Then, continue populating the test data
  populateTestData().then(() => {
    process.exit(0);
  }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}


// ---------------- If this is running as a script, call main ----------------
if (!module.parent) {
  main();
}
