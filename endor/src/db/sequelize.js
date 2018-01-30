import Sequelize from 'sequelize';
import { getActiveLogger } from '../utils/winston';

// Added for convenience
const {
  STRING,
  BOOLEAN,
  UUID,
  UUIDV4
} = Sequelize.DataTypes;

const ToolType = {
  CONTAINERIZATION: 'containerization',
  CONTINUOUS_INTEGRATION: 'continuousIntegration',
  DEPLOYMENT: 'deployment',
  WEB_FRAMEWORK: 'webFramework'
};

const InviteStatus = {
  OPEN: 'open',
  ACCEPTED: 'accepted',
  DECLINED: 'declined',
  RESCINDED: 'rescinded',
  EXPIRED: 'expired'
};

// Exports provided for convenience
module.exports.ToolType = ToolType;
module.exports.InviteStatus = InviteStatus;
module.exports.DataTypes = Sequelize.DataTypes;

let initialized = false;

module.exports.isInitialized = () => initialized;
module.exports.initSequelize = (database, username, password, options) => {
  if (initialized) {
    getActiveLogger().warn('Sequelize can only be initialized once!');
    return;
  }
  initialized = true;

  // Create the sequelize instance (once for the app)
  const model = new Sequelize(
    database,
    username,
    password,
    options
  );

  // --------------------------- MODEL DEFINITION START ---------------------------

  const User = model.define('user', {
    id: {
      primaryKey: true,
      type: UUID,
      defaultValue: UUIDV4,
    },
    username: { type: STRING, unique: true },
    email: STRING,
    firstName: STRING,
    lastName: STRING
  });

  const Credentials = model.define('credentials', {
    id: {
      primaryKey: true,
      type: UUID,
      defaultValue: UUIDV4,
    },
    password: { type: STRING, allowNull: false }
  });
  Credentials.belongsTo(User, { as: 'user', through: 'username' });

  const Client = model.define('client', {
    id: {
      primaryKey: true,
      type: UUID,
      defaultValue: UUIDV4,
    },
    clientId: { type: STRING, unique: true, allowNull: false },
    name: { type: STRING, allowNull: false },
    secret: { type: STRING, allowNull: false }
  });

  const AccessCode = model.define('accessCode', {
    id: {
      primaryKey: true,
      type: UUID,
      defaultValue: UUIDV4,
    },
    value: { type: STRING, allowNull: false },
    redirectURI: { type: STRING, allowNull: false }
  });
  AccessCode.belongsTo(User, { as: 'user', through: 'username' });

  const Token = model.define('Token', {
    id: {
      primaryKey: true,
      type: UUID,
      defaultValue: UUIDV4,
    },
    value: { type: STRING(2048), allowNull: false },
    expired: { type: BOOLEAN, defaultValue: false }
  });
  Token.belongsTo(User, { as: 'user', through: 'username' });

  const Tool = model.define('tool', {
    id: {
      primaryKey: true,
      type: UUID,
      defaultValue: UUIDV4,
    },
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
    // owners, contributors, invites, and various tools defined below
    id: {
      primaryKey: true,
      type: UUID,
      defaultValue: UUIDV4,
    },
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
    id: {
      primaryKey: true,
      type: UUID,
      defaultValue: UUIDV4,
    }
  });
  Project.belongsToMany(User, { as: 'owners', through: 'projectOwner' });
  User.belongsToMany(Project, { as: 'projectsOwned', through: 'projectOwner' });


  const ProjectContributor = model.define('projectContributor', {
    // ASSOCIATIONS DEFINED BELOW
    id: {
      primaryKey: true,
      type: UUID,
      defaultValue: UUIDV4,
    }
  });
  Project.belongsToMany(User, { as: 'contributors', through: 'projectContributor' });
  User.belongsToMany(Project, { as: 'projectsContributed', through: 'projectContributor' });


  const Invite = model.define('invite', {
    // userInvited and projectInvitedTo defined below
    id: {
      primaryKey: true,
      type: UUID,
      defaultValue: UUIDV4,
    },
    status: {
      type: Sequelize.DataTypes.ENUM,
      values: [
        InviteStatus.OPEN,
        InviteStatus.ACCEPTED,
        InviteStatus.DECLINED,
        InviteStatus.RESCINDED,
        InviteStatus.EXPIRED
      ],
      defaultValue: InviteStatus.OPEN
    },
    daysFromCreationUntilExpiration: {
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 30
    }
  });
  Invite.belongsTo(User, { as: 'userInvited' });
  Invite.belongsTo(Project, { as: 'projectInvitedTo' });

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
  module.exports.Invite = Invite;
  module.exports.Project = Project;
  module.exports.ProjectOwner = ProjectOwner;
  module.exports.ProjectContributor = ProjectContributor;
};
