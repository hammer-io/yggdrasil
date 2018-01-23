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
      const invites = await inviteService.getInvitesByProjectId(projectHammer.id);
      expect(invites.length).to.equal(2);
      expect(Array.isArray(invites)).to.equal(true);
    });
    it('should return an empty array if no invites are found', async () => {
      const projectTMNT = await sequelize.Project.findOne({
        where: { projectName: 'TMNT' }
      });
      const invites = await inviteService.getInvitesByProjectId(projectTMNT.id);
      expect(invites.length).to.equal(0);
      expect(Array.isArray(invites)).to.equal(true);
    });
    it('should return an empty array if the project doesn\'t exist', async () => {
      const invites = await inviteService.getInvitesByProjectId(777);
      expect(invites.length).to.equal(0);
      expect(Array.isArray(invites)).to.equal(true);
    });
  });

  describe('Get invites by user', async () => {
    it('should find all invites for the given user id', async () => {
      const userBuddy = await sequelize.User.findOne({
        where: { username: 'buddy' }
      });
      const invites = await inviteService.getInvitesByUserId(userBuddy.id);
      expect(invites.length).to.equal(2);
      expect(Array.isArray(invites)).to.equal(true);
      expect(invites[0].userInvitedId).to.equal(userBuddy.id);
      expect(invites[1].userInvitedId).to.equal(userBuddy.id);
      expect(invites[0].id).to.not.equal(invites[1].id);
    });
    it('should return an empty array if no invites are found', async () => {
      const userBob = await sequelize.User.findOne({
        where: { username: 'BobSagat' }
      });
      const invites = await inviteService.getInvitesByUserId(userBob.id);
      expect(invites.length).to.equal(0);
      expect(Array.isArray(invites)).to.equal(true);
    });
    it('should return an empty array if the user doesn\'t exist', async () => {
      const query = 777;
      const invites = await inviteService.getInvitesByUserId(query);
      expect(invites.length).to.equal(0);
      expect(Array.isArray(invites)).to.equal(true);
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
    // it('should create an expired invite with days set to 0', async () => {
    //   const expected = {
    //     status: 'expired',
    //     days: 0,
    //     userId: 1,
    //     projectId: 1
    //   };
    //   const invite = await inviteService.createInvite(expected.projectId, expected.userId, expected.days);
    //   assertInvite(invite, expected);
    // });
    // it('should throw an error for missing required fields', async () => {
    //   const testCases = [
    //     {
    //       projectId: null,
    //       userId: 1,
    //       days: 29,
    //       expectedErr: 'todo1'
    //     },
    //     {
    //       projectId: 1,
    //       userId: null,
    //       days: 30,
    //       expectedErr: 'todo2'
    //     },
    //     {
    //       projectId: 1,
    //       userId: 1,
    //       days: null,
    //       expectedErr: 'todo3'
    //     }
    //   ];
    //   for (let i = 0; i < testCases.length; i++) {
    //     const testCase = testCases[i];
    //     let errMsg = null;
    //     try {
    //       inviteService.createInvite(testCase.projectId, testCase.userId, testCase.days);
    //       expect.fail();
    //     } catch (err) {
    //       errMsg = err.message;
    //     }
    //     expect(errMsg).to.equal(testCase.expectedErr);
    //   }
    // });
    // it('should throw an error for invalid parameters', async () => {
    //   const testCases = [
    //     {
    //       description: 'Project doesn\'t exist',
    //       projectId: 777,
    //       userId: 1,
    //       days: 30,
    //       expectedErr: 'todo1'
    //     },
    //     {
    //       description: 'User doesn\'t exist',
    //       projectId: 1,
    //       userId: 777,
    //       days: 30,
    //       expectedErr: 'todo1'
    //     },
    //     {
    //       description: 'Invalid days : negative integer',
    //       projectId: 1,
    //       userId: 1,
    //       days: -1,
    //       expectedErr: 'todo1'
    //     },
    //     {
    //       description: 'Invalid days : not an integer',
    //       projectId: 1,
    //       userId: 1,
    //       days: "30",
    //       expectedErr: 'todo1'
    //     }
    //   ];
    //   for (let i = 0; i < testCases.length; i++) {
    //     const testCase = testCases[i];
    //     let errMsg = null;
    //     try {
    //       inviteService.createInvite(testCase.projectId, testCase.userId, testCase.days);
    //       expect.fail(testCase.description);
    //     } catch (err) {
    //       errMsg = err.message;
    //     }
    //     expect(errMsg, testCase.description).to.equal(testCase.expectedErr);
    //   }
    // });
  });

  // describe('Update invite', async () => {
  //   it('should update the invite status to accepted', async () => {
  //     const userJreach = sequelize.User.findOne({
  //       where: { username: 'jreach' }
  //     });
  //     const projectHammer = sequelize.Project.findOne({
  //       where: { projectName: 'hammer-io' }
  //     });
  //     const expected = {
  //       status: 'accepted',
  //       days: 30,
  //       userId: userJreach.id,
  //       projectId: projectHammer.id
  //     };
  //     const inviteId = 1;
  //     const invite = await inviteService.updateInvite(inviteId, InviteStatus.ACCEPTED);
  //     assertInvite(invite, expected);
  //   });
  //   it('should update the invite status to declined', async () => {
  //     const userJreach = sequelize.User.findOne({
  //       where: { username: 'jreach' }
  //     });
  //     const projectHammer = sequelize.Project.findOne({
  //       where: { projectName: 'hammer-io' }
  //     });
  //     const expected = {
  //       status: 'declined',
  //       days: 30,
  //       userId: userJreach.id,
  //       projectId: projectHammer.id
  //     };
  //     const inviteId = 1;
  //     const invite = await inviteService.updateInvite(inviteId, InviteStatus.DECLINED);
  //     assertInvite(invite, expected);
  //   });
  //   it('should update the invite status to rescinded', async () => {
  //     const userJreach = sequelize.User.findOne({
  //       where: { username: 'jreach' }
  //     });
  //     const projectHammer = sequelize.Project.findOne({
  //       where: { projectName: 'hammer-io' }
  //     });
  //     const expected = {
  //       status: 'rescinded',
  //       days: 30,
  //       userId: userJreach.id,
  //       projectId: projectHammer.id
  //     };
  //     const inviteId = 1;
  //     const invite = await inviteService.updateInvite(inviteId, InviteStatus.RESCINDED);
  //     assertInvite(invite, expected);
  //   });
  //   describe('should throw an error if it', async () => {
  //     it('tries to update the status when it\'s not OPEN', async () => {
  //       // TODO
  //       expect.fail('Not yet implemented', 'TODO');
  //       const inviteId = 1;
  //       const status = InviteStatus.OPEN;
  //       const invite = await inviteService.updateInvite(inviteId, status);
  //     });
  //     it('tries to update with an invalid status', async () => {
  //       // TODO
  //       expect.fail('Not yet implemented', 'TODO');
  //       const inviteId = 1;
  //       const status = InviteStatus.OPEN;
  //       const invite = await inviteService.updateInvite(inviteId, status);
  //     });
  //     it('tries to update an expired invite', async () => {
  //       // TODO
  //       expect.fail('Not yet implemented', 'TODO');
  //       const inviteId = 1;
  //       const status = InviteStatus.OPEN;
  //       const invite = await inviteService.updateInvite(inviteId, status);
  //     });
  //   });
  // });
});
