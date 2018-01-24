/* eslint-disable import/no-unresolved */
import sequelize from './sequelize';

// When syncing tables, this corresponds to the 'force' option.
// force: true will drop the table if it already exists
const overwriteExistingTables = true;

export async function populateTools() {
  await sequelize.Tool.create({
    name: 'TravisCI (open source)',
    toolType: sequelize.ToolType.CONTINUOUS_INTEGRATION,
    websiteUrl: 'https://travis-ci.org/',
    apiUrl: 'https://api.travis-ci.org/',
    documentationUrl: 'https://docs.travis-ci.com/api',
    logoSvgUrl: 'https://travis-ci.com/images/logos/TravisCI-Mascot-1.svg',
    logoLargeUrl: 'https://travis-ci.com/images/logos/TravisCI-Mascot-1.png',
    usageRequirements: 'You must have created a TravisCI open source account before using this tool.',
    specialConsiderations: 'To use the open source version of TravisCI, you must have a GitHub account.'
  });
  await sequelize.Tool.create({
    name: 'Docker Hub',
    toolType: sequelize.ToolType.CONTAINERIZATION,
    websiteUrl: 'https://hub.docker.com/',
    apiUrl: 'https://index.docker.io/v1/',
    documentationUrl: 'https://docs.docker.com/',
    logoLargeUrl: 'https://www.docker.com/sites/default/files/vertical_large.png',
    logoSmallUrl: 'https://www.docker.com/sites/default/files/vertical_small.png',
  });
  // noinspection HtmlUnknownAttribute
  await sequelize.Tool.create({
    name: 'Heroku',
    toolType: sequelize.ToolType.DEPLOYMENT,
    websiteUrl: 'https://www.heroku.com/',
    apiUrl: 'https://api.heroku.com/',
    documentationUrl: 'https://devcenter.heroku.com/',
    logoSvgUrl: 'data:image/svg+xml;utf8,<svg width="27" height="30" viewBox="0 0 27 30" xmlns="http://www.w3.org/2000/svg"><title>heroku-logo</title><path d="M3 0C1.13 0 0 1.11 0 2.903v24.194C0 28.883 1.13 30 3 30h21c1.863 0 3-1.11 3-2.903V2.903C26.994 1.11 25.863 0 24 0H3zm21.042 2c.508.006.958.448.958.929V27.07c0 .487-.45.929-.958.929H2.958C2.45 28 2 27.558 2 27.071V2.93c0-.488.45-.93.958-.93h21.084zM20 25h-2.781v-8.506c0-.774-.237-1.048-.468-1.208-1.396-.959-5.414-.042-7.834.916L7 17.012 7.006 5h2.816v7.917a20.99 20.99 0 0 1 1.882-.482c2.988-.643 5.184-.47 6.616.505.787.536 1.68 1.59 1.68 3.554V25zm-6-15h3.293A16.109 16.109 0 0 0 20 5h-3.287c-.49 1.188-1.385 3.188-2.713 5zM7 25v-7l3 3.5L7 25z" fill="%239E7CC1" fill-rule="evenodd"/></svg>',
    logoLargeUrl: 'https://status.heroku.com/images/favicon-4d37b8350e89706867dad5caab4af5e5.ico',
    logoSmallUrl: 'https://id.heroku.com/assets/logo-vertical.png',
    usageRequirements: 'You must have created a Heroku account before using this tool.'
  });
  await sequelize.Tool.create({
    name: 'Express.js',
    toolType: sequelize.ToolType.WEB_FRAMEWORK,
    websiteUrl: 'http://expressjs.com/',
    documentationUrl: 'http://expressjs.com/en/4x/api.html',
    logoLargeUrl: 'https://camo.githubusercontent.com/fc61dcbdb7a6e49d3adecc12194b24ab20dfa25b/68747470733a2f2f692e636c6f756475702e636f6d2f7a6659366c4c376546612d3330303078333030302e706e67',
  });
}

export async function defineTables() {
  // Make all calls to initialize tables here!
  await sequelize.User.sync({ force: overwriteExistingTables });
  await sequelize.Credentials.sync({ force: overwriteExistingTables });
  await sequelize.Tool.sync({ force: overwriteExistingTables });
  await sequelize.Project.sync({ force: overwriteExistingTables });
  await sequelize.ProjectOwner.sync({ force: overwriteExistingTables });
  await sequelize.ProjectContributor.sync({ force: overwriteExistingTables });
  await sequelize.Invite.sync({ force: overwriteExistingTables });
  await sequelize.Client.sync({ force: overwriteExistingTables });
  await sequelize.AccessCode.sync({ force: overwriteExistingTables });
  await sequelize.Token.sync({ force: overwriteExistingTables });
}


/**
 * ---------------------------- MAIN ----------------------------
 * The main function only gets run if this file is run as a script
 */
async function main() {
  try {
    // eslint-disable-next-line global-require
    const dbConfig = require('../../dbConfig.json');

    // First, we need to initialize the data model
    await sequelize.initSequelize(
      dbConfig.database,
      dbConfig.username,
      dbConfig.password,
      dbConfig.options
    );

    // Then, define the tables and set initial values
    await defineTables();
    await populateTools();
  } catch (err) {
    console.error('Database did not initialize correctly:', err);
    process.exit(1);
  }

  console.log('Database was successfully initialized!');
  process.exit(0);
}


// ---------------- If this is running as a script, call main ----------------
if (!module.parent) {
  main();
}
