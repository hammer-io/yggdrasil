import Sequelize from 'sequelize';

import dbConfig from '../../../dbConfig.json';

// Create the sequelize instance (once for the app)
module.exports = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig.options
);
