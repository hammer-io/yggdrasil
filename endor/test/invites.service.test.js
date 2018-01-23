import { expect } from 'chai';
import { defineTables, populateUsers } from './setupMockDB';
// Using Expect style
const sequalize = require('../src/db/sequelize');

import InviteService from './../dist/services/invites.service';
import { getActiveLogger } from '../dist/utils/winston';

const InviteStatus = sequalize.InviteStatus;

// Initialize Sequelize with sqlite for testing
sequalize.initSequelize(
  'database',
  'root',
  'root', {
    dialect: 'sqlite',
    logging: false
  }
);

const inviteService = new InviteService(sequalize.Invite, getActiveLogger());

describe('Testing Invite Service', () => {
  beforeEach(async () => {
    await defineTables();
    await populateUsers();
  });

  describe('Validate invite', async () => {
  });

  describe('Get invite by id', async () => {
    it('should find an invite that exists', async () => {
      const query = 1;
      const invite = await inviteService.getInviteById(query);
      expect(invite.id).to.equal(query);
      expect(invite.status).to.equal('open');
      expect(invite.daysFromCreationUntilExpiration).to.equal(30);
      // TODO: Make test data available
      expect(invite.userInvitedId).to.equal(1);
      expect(invite.projectInvitedToId).to.equal(1);
    });
    it('should throw InviteNotFoundException if the invite doesn\'t exist', async () => {
      try {
        const query = 777;
        const invite = await inviteService.getInviteById(query);
        // this will fail if the error is not thrown and the
        // object actually has value. Theoretically should not be called.
        expect(invite).to.be.a('undefined');
      } catch (error) {
        expect(error).to.be.a('object');
        expect(error.message).to.equal(`Invite with id ${query} could not be found.`);
        expect(error.type).to.equal('Not Found');
        expect(error.status).to.equal(404);
      }
    });
  });

  describe('Get invites by project id', async () => {
    it('should find all invites relevant to the project', async () => {
      const query = 1;
      const invites = await inviteService.getInvitesByProjectId(query);
      expect(invites.length).to.equal(4);
      expect(Array.isArray(invites)).to.equal(true);
    });
    it('should return an empty array if no invites are found', async () => {
      const query = 2;
      const invites = await inviteService.getInvitesByProjectId(query);
      expect(invites.length).to.equal(0);
      expect(Array.isArray(invites)).to.equal(true);
    });
    it('should throw ProjectNotFoundException if the project doesn\'t exist', async () => {
      try {
        const query = 777;
        const invite = await inviteService.getInvitesByProjectId(query);
        // this will fail if the error is not thrown and the
        // object actually has value. Theoretically should not be called.
        expect(invite).to.be.a('undefined');
      } catch (error) {
        expect(error).to.be.a('object');
        expect(error.message).to.equal(`Project with id ${query} not found`);
        expect(error.type).to.equal('Not Found');
        expect(error.status).to.equal(404);
      }
    });
  });

  describe('Get invites by user', async () => {
    it('should find all invites for the given user id', async () => {
      const query = 1;
      const invites = await inviteService.getInvitesByUserId(query);
      expect(invites.length).to.equal(4);
      expect(Array.isArray(invites)).to.equal(true);
    });
    it('should find all invites for the given username', async () => {
      const query = 'jreach';
      const invites = await inviteService.getInvitesByUserId(query);
      expect(invites.length).to.equal(4);
      expect(Array.isArray(invites)).to.equal(true);
    });
    it('should return an empty array if no invites are found', async () => {
      const query = 2;
      const invites = await inviteService.getInvitesByUserId(query);
      expect(invites.length).to.equal(0);
      expect(Array.isArray(invites)).to.equal(true);
    });
    it('should throw a UserNotFoundException if the user doesn\'t exist', async () => {
      try {
        const query = 777;
        const invite = await inviteService.getInvitesByUserId(query);
        // this will fail if the error is not thrown and the
        // object actually has value. Theoretically should not be called.
        expect(invite).to.be.a('undefined');
      } catch (error) {
        expect(error).to.be.a('object');
        expect(error.message).to.equal(`User with ${query} could not be found.`);
        expect(error.type).to.equal('Not Found');
        expect(error.status).to.equal(404);
      }
    });
  });

  describe('Create invite', async () => {
    it('should create a new invite', async () => {
      const projectId = 1;
      const userId = 1;
      const days = 42;
      const invite = await inviteService.createInvite(projectId, userId, days);
      // expect(invite.id).to.equal(query); // TODO: isInt?
      expect(invite.status).to.equal('open');
      expect(invite.daysFromCreationUntilExpiration).to.equal(days);
      expect(invite.userInvitedId).to.equal(userId);
      expect(invite.projectInvitedToId).to.equal(projectId);
    });
    it('should throw an error for missing required fields', async () => {
      const projectId = null;
      const userId = 1;
      const days = 42;
      const invite = await inviteService.createInvite(projectId, userId, days);
    });
    it('should throw an error for invalid parameters', async () => {
      const projectId = 1;
      const userId = 1;
      const days = "42"; // String, not an int...?
      const invite = await inviteService.createInvite(projectId, userId, days);
    });
    // TODO: Missing user, missing project, invalid days (various forms)
  });

  describe('Update invite', async () => {
    it('should update the invite status to accepted', async () => {
      const inviteId = 1;
      const status = InviteStatus.OPEN;
      const invite = await inviteService.updateInvite(inviteId, status);
    });
    it('should update the invite status to declined', async () => {
      const inviteId = 1;
      const status = InviteStatus.OPEN;
      const invite = await inviteService.updateInvite(inviteId, status);
    });
    it('should update the invite status to rescinded', async () => {
      const inviteId = 1;
      const status = InviteStatus.OPEN;
      const invite = await inviteService.updateInvite(inviteId, status);
    });
    describe('should throw an error if it', async () => {
      it('tries to update the status when it\'s not OPEN', async () => {
        const inviteId = 1;
        const status = InviteStatus.OPEN;
        const invite = await inviteService.updateInvite(inviteId, status);
      });
      it('tries to update with an invalid status', async () => {
        const inviteId = 1;
        const status = InviteStatus.OPEN;
        const invite = await inviteService.updateInvite(inviteId, status);
      });
      it('tries to update an expired invite', async () => {
        const inviteId = 1;
        const status = InviteStatus.OPEN;
        const invite = await inviteService.updateInvite(inviteId, status);
      });
    });
  });
});
