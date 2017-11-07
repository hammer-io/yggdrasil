import sequelize from './sequelize';

// When syncing tables, this corresponds to the 'force' option.
// force: true will drop the table if it already exists
const overwriteExistingTables = true;

async function main() {
  try {
    // Make all calls to initialize tables here!
    await sequelize.User.sync({ force: overwriteExistingTables });
  } catch (err) {
    console.error('Database did not initialize correctly:', err);
    process.exit(1);
  }

  console.log('Database was successfully initialized!');
  process.exit(0);
}

main();
