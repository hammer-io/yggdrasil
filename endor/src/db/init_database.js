import Sequelize from 'sequelize';

import sequelize from './sequelize';

// When syncing tables, this corresponds to the 'force' option.
// force: true will drop the table if it already exists
const overwriteExistingTables = true;

/**
 * Creates the 'users' table.
 */
function initUsers() {
  const User = sequelize.define('user', {
    firstName: { type: Sequelize.STRING },
    lastName: { type: Sequelize.STRING }
  });
  return User.sync({ force: overwriteExistingTables });
}

async function main() {
  try {
    await initUsers();
  } catch (err) {
    console.error('Database did not initialize correctly:', err);
    process.exit(1);
  }

  console.log('Database was successfully initialized!');
  process.exit(0);
}

main();
