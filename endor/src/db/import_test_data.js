import bcrypt from 'bcrypt';
import sequelize from './sequelize';

// This file fills the database with data for testing

async function importUserData() {
  const salt = await bcrypt.genSalt(10);
  const pass = await bcrypt.hash('plaintext1', salt);
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

async function importProjectData() {
  const project = await sequelize.Project.create({
    projectName: 'TMNT',
    description: 'You gotta know what a crumpet is to understand cricket!',
    version: '1.2.3',
    license: 'MIT',
    authors: 'Casey Jones, Raphael'
  });

  // Add project owners
  const user1 = await sequelize.User.findOne({
    where: { username: 'johnnyb' }
  });
  const user2 = await sequelize.User.findOne({
    where: { username: 'jreach' }
  });
  // One way to specify the owner of a project
  await project.addOwners(user1);
  // Another way to do it
  await user2.addProjectsOwned(project);

  // Add project contributors
  const user3 = await sequelize.User.findOne({
    where: { username: 'BobSagat' }
  });
  await project.addContributors([user1, user2, user3]);

  // Add tooling
  const depTools = await sequelize.Tool.findAll({
    where: { toolType: sequelize.ToolType.DEPLOYMENT }
  });
  await project.setDeploymentTool(depTools[0]);
  const ciTools = await sequelize.Tool.findAll({
    where: { toolType: sequelize.ToolType.CONTINUOUS_INTEGRATION }
  });
  await project.setContinuousIntegrationTool(ciTools[0]);
}

async function importTestData() {
  await importUserData();
  await importProjectData();
}

/**
 * ---  MAIN  ---
 */
importTestData().then(() => {
  process.exit(0);
}).catch((err) => {
  console.error(err.errors);
  process.exit(1);
});
