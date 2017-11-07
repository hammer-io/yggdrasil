import Sequelize from 'sequelize';

// eslint-disable-next-line import/no-unresolved
import dbConfig from '../../../dbConfig.json';

// Create the sequelize instance (once for the app)
module.exports = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig.options
);
