import sequelize from './sequelize';

// This file fills the database with data for testing

async function importTestData() {
  await sequelize.User.create({
    username: 'BobSagat',
    email: 'Bob@AFV.com',
    firstName: 'Bob',
    lastName: 'Sagat'
  });
  await sequelize.User.create({
    username: 'globalwarmingguy56',
    email: 'Al@saveourplanet.com',
    firstName: 'Al',
    lastName: 'Gore'
  });
  await sequelize.User.create({
    username: 'jreach',
    email: 'jreach@gmail.com',
    firstName: 'Jack',
    lastName: 'Reacher'
  });
  await sequelize.User.create({
    username: 'johnnyb',
    email: 'jbravo@cartoonnetwork.com',
    firstName: 'Johnny',
    lastName: 'Bravo'
  });
}

importTestData().then(() => {
  process.exit(0);
}).catch((err) => {
  console.error(err.errors);
  process.exit(1);
});
