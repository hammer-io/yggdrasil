import { expect } from 'chai';

import { defineTables } from '../src/db/init_database';
import { populateUsers, populateProjects, populateInvites } from '../src/db/import_test_data';

// Using Expect style
const sequelize = require('../src/db/sequelize');

import InviteService from './../src/services/invites.service';
import { getMockLogger } from './mockLogger';

const InviteStatus = sequelize.InviteStatus;

// Initialize Sequelize with sqlite for testing
sequelize.initSequelize(
  'database',
  'root',
  'root', {
    dialect: 'sqlite',
    logging: false
  }
);

const inviteService = new InviteService(sequelize.Invite, getMockLogger());

function assertInvite(actual, expected) {
  expect(actual.status).to.equal(expected.status);
  expect(actual.daysFromCreationUntilExpiration).to.equal(expected.days);
  expect(actual.userInvitedId).to.equal(expected.userId);
  expect(actual.projectInvitedToId).to.equal(expected.projectId);
}

describe('Testing Invite Service', () => {
  beforeEach(async () => {
    await defineTables();
    await populateUsers();
    await populateProjects();
    await populateInvites();
  });

  describe('Validate invite', async () => {
    expect.fail('Not yet implemented', 'TODO');
  });

  describe('Get invite by id', async () => {
    it('should find an invite that exists', async () => {
      const query = 1;
      const invite = await inviteService.getInviteById(query);
      expect(invite.id).to.equal(query);
      assertInvite(invite, {
        status: 'open',
        days: 30,
        userId: 3,
        projectId: 2
      });
    });
    it('should throw InviteNotFoundException if the invite doesn\'t exist', async () => {
      const query = 777;
      try {
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
      const projectHammer = await sequelize.Project.findOne({
        where: { projectName: 'hammer-io' }
      });
      const invites = await inviteService.getInvitesByProjectId(projectHammer.id, null);
      expect(invites.length).to.equal(2);
      expect(Array.isArray(invites)).to.equal(true);
      invites.sort((a, b) => a.userInvitedId - b.userInvitedId);
      const inviteJreach = invites[0];
      const userJreach = await sequelize.User.findOne({
        where: { username: 'jreach' }
      });
      const inviteBuddy = invites[1];
      const userBuddy = await sequelize.User.findOne({
        where: { username: 'buddy' }
      });
      assertInvite(inviteJreach, {
        status: InviteStatus.OPEN,
        days: 30,
        userId: userJreach.id,
        projectId: projectHammer.id
      });
      assertInvite(inviteBuddy, {
        status: InviteStatus.DECLINED,
        days: 15,
        userId: userBuddy.id,
        projectId: projectHammer.id
      });
    });
    it('should find all invites relevant to the project, but filtered by the status supplied', async () => {
      const projectHammer = await sequelize.Project.findOne({
        where: { projectName: 'hammer-io' }
      });
      const openInvites = await inviteService.getInvitesByProjectId(projectHammer.id, InviteStatus.OPEN);
      expect(openInvites.length).to.equal(1);
      expect(Array.isArray(openInvites)).to.equal(true);
      const inviteJreach = openInvites[0];
      const userJreach = await sequelize.User.findOne({
        where: { username: 'jreach' }
      });
      assertInvite(inviteJreach, {
        status: InviteStatus.OPEN,
        days: 30,
        userId: userJreach.id,
        projectId: projectHammer.id
      });

      const declinedInvites = await inviteService.getInvitesByProjectId(projectHammer.id, InviteStatus.DECLINED);
      expect(declinedInvites.length).to.equal(1);
      expect(Array.isArray(declinedInvites)).to.equal(true);
      const inviteBuddy = declinedInvites[0];
      const userBuddy = await sequelize.User.findOne({
        where: { username: 'buddy' }
      });
      assertInvite(inviteBuddy, {
        status: InviteStatus.DECLINED,
        days: 15,
        userId: userBuddy.id,
        projectId: projectHammer.id
      });
    });
    it('should return an empty array if no invites are found', async () => {
      const projectTMNT = await sequelize.Project.findOne({
        where: { projectName: 'TMNT' }
      });
      const invites = await inviteService.getInvitesByProjectId(projectTMNT.id, null);
      expect(invites.length).to.equal(0);
      expect(Array.isArray(invites)).to.equal(true);
    });
    it('should return an empty array if the project doesn\'t exist', async () => {
      const invites = await inviteService.getInvitesByProjectId(777, null);
      expect(invites.length).to.equal(0);
      expect(Array.isArray(invites)).to.equal(true);
    });
    it('should throw an Exception if the user passes an invalid status parameter', async () => {
      const projectHammer = await sequelize.Project.findOne({
        where: { projectName: 'hammer-io' }
      });
      let errMsg = null;
      try {
        const invites = await inviteService.getInvitesByProjectId(projectHammer.id, 'baby beluga');
        console.error(invites);
        expect.fail();
      } catch (err) {
        errMsg = err.errors[0].message;
      }
      expect(errMsg).to.equal('The status must be set to one of the following values: open, accepted, declined, rescinded, expired.');
    });
  });

  describe('Get invites by user', async () => {
    it('should find all invites for the given user id', async () => {
      const userBuddy = await sequelize.User.findOne({
        where: { username: 'buddy' }
      });
      const invites = await inviteService.getInvitesByUserId(userBuddy.id, null);
      expect(invites.length).to.equal(2);
      expect(Array.isArray(invites)).to.equal(true);
      expect(invites[0].userInvitedId).to.equal(userBuddy.id);
      expect(invites[1].userInvitedId).to.equal(userBuddy.id);
      expect(invites[0].id).to.not.equal(invites[1].id);
    });
    it('should find all invites for the given user id, but filtered by the status supplied', async () => {
      const userBuddy = await sequelize.User.findOne({
        where: { username: 'buddy' }
      });
      const openInvites = await inviteService.getInvitesByUserId(userBuddy.id, InviteStatus.OPEN);
      expect(openInvites.length).to.equal(1);
      expect(Array.isArray(openInvites)).to.equal(true);
      const projectDrumItDown = await sequelize.Project.findOne({
        where: { projectName: 'drumitdown' }
      });
      assertInvite(openInvites[0], {
        status: InviteStatus.OPEN,
        days: 30,
        userId: userBuddy.id,
        projectId: projectDrumItDown.id
      });

      const declinedInvites = await inviteService.getInvitesByUserId(userBuddy.id, InviteStatus.DECLINED);
      expect(declinedInvites.length).to.equal(1);
      expect(Array.isArray(declinedInvites)).to.equal(true);
      const projectHammer = await sequelize.Project.findOne({
        where: { projectName: 'hammer-io' }
      });
      assertInvite(declinedInvites[0], {
        status: InviteStatus.DECLINED,
        days: 15,
        userId: userBuddy.id,
        projectId: projectHammer.id
      });
    });
    it('should return an empty array if no invites are found', async () => {
      const userBob = await sequelize.User.findOne({
        where: { username: 'BobSagat' }
      });
      const invites = await inviteService.getInvitesByUserId(userBob.id, null);
      expect(invites.length).to.equal(0);
      expect(Array.isArray(invites)).to.equal(true);
    });
    it('should return an empty array if the user doesn\'t exist', async () => {
      const query = 777;
      const invites = await inviteService.getInvitesByUserId(query, null);
      expect(invites.length).to.equal(0);
      expect(Array.isArray(invites)).to.equal(true);
    });
    it('should throw an Exception if the user passes an invalid status parameter', async () => {
      let errMsg = null;
      try {
        const invites = await inviteService.getInvitesByUserId(1, 'forest gump');
        console.error(invites);
        expect.fail();
      } catch (err) {
        errMsg = err.errors[0].message;
      }
      expect(errMsg).to.equal('The status must be set to one of the following values: open, accepted, declined, rescinded, expired.');
    });
  });

  describe('Create invite', async () => {
    it('should create a new invite', async () => {
      const expected = {
        status: 'open',
        days: 42,
        userId: 1,
        projectId: 1
      };
      const invite = await inviteService.createInvite(expected.projectId, expected.userId, expected.days);
      assertInvite(invite, expected);
    });
    it('should create an expired invite with days set to 0', async () => {
      const expected = {
        status: 'expired',
        days: 0,
        userId: 1,
        projectId: 1
      };
      const invite = await inviteService.createInvite(expected.projectId, expected.userId, expected.days);
      assertInvite(invite, expected);
    });
    it('should throw an error for missing required fields', async () => {
      const testCases = [
        {
          projectId: null,
          userId: 1,
          days: 29,
          expectedErr: 'Project is required.'
        },
        {
          projectId: 1,
          userId: null,
          days: 30,
          expectedErr: 'User is required.'
        }
      ];
      for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];
        let errMsg = null;
        try {
          const invite = await inviteService.createInvite(testCase.projectId, testCase.userId, testCase.days);
          console.error(invite);
          expect.fail();
        } catch (err) {
          errMsg = err.errors[0].message;
        }
        expect(errMsg).to.equal(testCase.expectedErr);
      }
    });
    it('should throw an error for invalid parameters', async () => {
      const testCases = [
        {
          description: 'Project doesn\'t exist',
          projectId: 777,
          userId: 1,
          days: 30,
          expectedErr: 'Either the user or the project supplied to the invite service does not exist'
        },
        {
          description: 'User doesn\'t exist',
          projectId: 1,
          userId: 777,
          days: 30,
          expectedErr: 'Either the user or the project supplied to the invite service does not exist'
        },
        {
          description: 'Invalid days : negative integer',
          projectId: 1,
          userId: 1,
          days: -1,
          expectedErr: 'Must be a non-negative integer.'
        },
        {
          description: 'Invalid days : not an integer',
          projectId: 1,
          userId: 1,
          days: "30",
          expectedErr: 'Must be a non-negative integer.'
        }
      ];
      for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];
        let errMsg = null;
        try {
          const invite = await inviteService.createInvite(testCase.projectId, testCase.userId, testCase.days);
          console.error(invite);
          expect.fail(testCase.description);
        } catch (err) {
          errMsg = err.errors[0].message;
        }
        expect(errMsg, `Test Case ${i+1} (${testCase.description})`).to.equal(testCase.expectedErr);
      }
    });
  });

  describe('Update invite', async () => {
    it('should update the invite status to accepted', async () => {
      const userJreach = await sequelize.User.findOne({
        where: { username: 'jreach' }
      });
      const projectHammer = await sequelize.Project.findOne({
        where: { projectName: 'hammer-io' }
      });
      const expected = {
        status: 'accepted',
        days: 30,
        userId: userJreach.id,
        projectId: projectHammer.id
      };
      const inviteId = 1;
      const invite = await inviteService.updateInvite(inviteId, InviteStatus.ACCEPTED);
      assertInvite(invite, expected);
    });
    it('should update the invite status to declined', async () => {
      const userJreach = await sequelize.User.findOne({
        where: { username: 'jreach' }
      });
      const projectHammer = await sequelize.Project.findOne({
        where: { projectName: 'hammer-io' }
      });
      const expected = {
        status: 'declined',
        days: 30,
        userId: userJreach.id,
        projectId: projectHammer.id
      };
      const inviteId = 1;
      const invite = await inviteService.updateInvite(inviteId, InviteStatus.DECLINED);
      assertInvite(invite, expected);
    });
    it('should update the invite status to rescinded', async () => {
      const userJreach = await sequelize.User.findOne({
        where: { username: 'jreach' }
      });
      const projectHammer = await sequelize.Project.findOne({
        where: { projectName: 'hammer-io' }
      });
      const expected = {
        status: 'rescinded',
        days: 30,
        userId: userJreach.id,
        projectId: projectHammer.id
      };
      const inviteId = 1;
      const invite = await inviteService.updateInvite(inviteId, InviteStatus.RESCINDED);
      assertInvite(invite, expected);
    });
    describe('should throw an error if it', async () => {
      it('tries to update the status when it\'s not OPEN', async () => {
        const userBuddy = await sequelize.User.findOne({
          where: { username: 'buddy' }
        });
        const buddysInvites = await inviteService.getInvitesByUserId(userBuddy.id, null);
        const declinedInvite = buddysInvites.filter(invite => invite.status === InviteStatus.DECLINED)[0];

        let errMsg = null;
        try {
          const updatedInvite = await inviteService.updateInvite(declinedInvite.id, InviteStatus.ACCEPTED);
          console.error(updatedInvite);
          expect.fail();
        } catch (err) {
          errMsg = err.errors[0].message;
        }
        expect(errMsg).to.equal('Only an OPEN invite can be accepted, rescinded, or declined.');
      });
      it('tries to update with an invalid status', async () => {
        const userJreach = await sequelize.User.findOne({
          where: { username: 'jreach' }
        });
        const invites = await inviteService.getInvitesByUserId(userJreach.id, null);
        const invite = invites[0];

        let errMsg = null;
        try {
          const updatedInvite = await inviteService.updateInvite(invite.id, 'collywobbled');
          console.error(updatedInvite);
          expect.fail();
        } catch (err) {
          errMsg = err.errors[0].message;
        }
        expect(errMsg).to.equal('The status must be set to one of the following values: open, accepted, declined, rescinded, expired.');
      });
      it('tries to update an expired invite', async () => {
        const invite = await inviteService.createInvite(1, 1, 0);
        expect(invite.status).to.equal(InviteStatus.EXPIRED);
        let errMsg = null;
        try {
          const updatedInvite = await inviteService.updateInvite(invite.id, 'open');
          console.error(updatedInvite);
          expect.fail();
        } catch (err) {
          errMsg = err.errors[0].message;
        }
        expect(errMsg).to.equal('Only an OPEN invite can be accepted, rescinded, or declined.');
      });
    });
  });
});
