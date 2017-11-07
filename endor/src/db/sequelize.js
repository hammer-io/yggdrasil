import Sequelize from 'sequelize';

// eslint-disable-next-line import/no-unresolved
import dbConfig from '../../../dbConfig.json';

// Create the sequelize instance (once for the app)
const model = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig.options
);

// --------------------------- MODEL DEFINITION START ---------------------------

const User = model.define('user', {
  username: { type: Sequelize.DataTypes.STRING, unique: true },
  email: { type: Sequelize.DataTypes.STRING },
  firstName: { type: Sequelize.DataTypes.STRING },
  lastName: { type: Sequelize.DataTypes.STRING }
});

// --------------------------- MODEL DEFINITION END ---------------------------

module.exports.model = model;
module.exports.DataTypes = Sequelize.DataTypes; // convenience
module.exports.User = User;
