import Sequelize from 'sequelize';

// eslint-disable-next-line import/no-unresolved
import dbConfig from '../../dbConfig.json';

// Added for convenience
// eslint-disable-next-line prefer-destructuring
const STRING = Sequelize.DataTypes.STRING;
// eslint-disable-next-line prefer-destructuring
const BOOLEAN = Sequelize.DataTypes.BOOLEAN;

// Create the sequelize instance (once for the app)
const model = new Sequelize(
  'database',
  'root',
  'root', {
    dialect: 'sqlite',
    logging: false
  }
);

// --------------------------- MODEL DEFINITION START ---------------------------


const User = model.define('user', {
  username: { type: STRING, unique: true },
  email: STRING,
  firstName: STRING,
  lastName: STRING
});

const Credentials = model.define('credentials', {
  password: { type: STRING, allowNull: false }
});
Credentials.belongsTo(User, { as: 'user', through: 'username' });

const Client = model.define('client', {
  client_id: { type: STRING, unique: true, allowNull: false },
  name: { type: STRING, allowNull: false },
  secret: { type: STRING, allowNull: false }
});
Client.belongsTo(User, { as: 'user', through: 'username' });

const AccessCode = model.define('accessCode', {
  value: { type: STRING, allowNull: false },
  redirectURI: { type: STRING, allowNull: false }
});
AccessCode.belongsTo(User, { as: 'user', through: 'username' });
AccessCode.belongsTo(Client, { as: 'client', through: 'id' });

const Token = model.define('Token', {
  value: { type: STRING(2048), allowNull: false },
  expired: { type: BOOLEAN, defaultValue: false }
});
Token.belongsTo(User, { as: 'user', through: 'username' });
Token.belongsTo(Client, { as: 'client', through: 'id' });

const ToolType = {
  CONTAINERIZATION: 'containerization',
  CONTINUOUS_INTEGRATION: 'continuousIntegration',
  DEPLOYMENT: 'deployment',
  WEB_FRAMEWORK: 'webFramework'
};
const Tool = model.define('tool', {
  name: { type: STRING, unique: true },
  toolType: {
    type: Sequelize.DataTypes.ENUM,
    values: [
      ToolType.CONTAINERIZATION,
      ToolType.CONTINUOUS_INTEGRATION,
      ToolType.DEPLOYMENT,
      ToolType.WEB_FRAMEWORK
    ]
  },
  websiteUrl: STRING,
  apiUrl: STRING,
  documentationUrl: STRING,
  logoSvgUrl: STRING(2000),
  logoLargeUrl: STRING(2000),
  logoSmallUrl: STRING(2000),
  usageRequirements: STRING,
  specialConsiderations: STRING
});


const Project = model.define('project', {
  projectName: STRING,
  description: STRING(1024),
  version: STRING,
  license: STRING,
  authors: STRING
}, {
  paranoid: true
});
Project.belongsTo(Tool, { as: 'containerizationTool' });
Project.belongsTo(Tool, { as: 'continuousIntegrationTool' });
Project.belongsTo(Tool, { as: 'deploymentTool' });
Project.belongsTo(Tool, { as: 'webFramework' });


const ProjectOwner = model.define('projectOwner', {
  // ASSOCIATIONS DEFINED BELOW
});
Project.belongsToMany(User, { as: 'owners', through: 'projectOwner' });
User.belongsToMany(Project, { as: 'projectsOwned', through: 'projectOwner' });


const ProjectContributor = model.define('projectContributor', {
  // ASSOCIATIONS DEFINED BELOW
});
Project.belongsToMany(User, { as: 'contributors', through: 'projectContributor' });
User.belongsToMany(Project, { as: 'projectsContributed', through: 'projectContributor' });


// --------------------------- MODEL DEFINITION END ---------------------------


// Model Instance
module.exports.model = model;

// Model Objects
module.exports.User = User;
module.exports.Credentials = Credentials;
module.exports.Client = Client;
module.exports.AccessCode = AccessCode;
module.exports.Token = Token;
module.exports.Tool = Tool;
module.exports.Project = Project;
module.exports.ProjectOwner = ProjectOwner;
module.exports.ProjectContributor = ProjectContributor;

// Other things provided for convenience
module.exports.ToolType = ToolType;
module.exports.DataTypes = Sequelize.DataTypes;
