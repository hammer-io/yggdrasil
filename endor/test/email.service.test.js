import { expect } from 'chai';
import nodemailer from 'nodemailer';

import { defineTables } from '../src/db/init_database';
import { populateUsers, populateProjects, populateInvites } from '../src/db/import_test_data';

// Using Expect style
const sequelize = require('../src/db/sequelize');

import * as emailUtil from './util/email';
import EmailService from '../src/services/email.service';
import { getMockLogger } from './mockLogger';

const InviteStatus = sequelize.InviteStatus;

// Initialize Sequelize with sqlite for testing
if (!sequelize.isInitialized()) {
  sequelize.initSequelize(
    'database',
    'root',
    'root', {
      dialect: 'sqlite',
      logging: false
    }
  );
}

let emailService = null;

describe('Testing Email Service', () => {
  before(async () => {
    try {
      await defineTables();
      await populateUsers();
      await populateProjects();
      await populateInvites();
      const transportOptions = await emailUtil.getTestTransportOptions();
      emailService = new EmailService('"Holmgang" <holmgang@hammer-io.github.io>', getMockLogger(), transportOptions);
    } catch (err) {
      console.log('ERROR: Something went wrong setting up the email service!');
      console.log(err);
      expect.fail();
    }
  });

  describe('Send email', async () => {
    it('should send an email', async () => {
      const invite = await sequelize.Invite.findOne(  {where: { status: InviteStatus.OPEN         }});
      const user = await sequelize.User.findOne(      {where: {     id: invite.userInvitedId      }});
      const project = await sequelize.Project.findOne({where: {     id: invite.projectInvitedToId }});

      const results = await emailService.emailInvite(user, project, invite);

      // Show the preview URL (viewable only if you're online)
      const previewUrl = nodemailer.getTestMessageUrl(results);
      console.log(`      Preview URL: ${previewUrl}`);

      // Verify the results of the method call
      expect(Array.isArray(results.accepted)).to.equal(true);
      expect(results.accepted.length).to.equal(1);
      expect(results.accepted[0]).to.equal(user.email);
      expect(Array.isArray(results.rejected)).to.equal(true);
      expect(results.rejected.length).to.equal(0);
    }).timeout(10000);
  });
});
