async function populateUsers() {
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
  ])
}