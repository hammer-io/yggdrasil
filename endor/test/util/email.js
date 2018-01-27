import nodemailer from 'nodemailer';
import path from 'path';
import * as fileUtil from './file';

const emailConfigFilename = '../../emailConfig.json';

/**
 * Generate test SMTP service account from ethereal.email
 * This account information is written to './endor/emailConfig.json' for use
 * in running additional tests and viewing email results at https://ethereal.email/
 * @returns {Promise.Object} the account information for the new ethereal account
 */
async function setupTestAccount() {
  return new Promise((resolve, reject) => {
    nodemailer.createTestAccount((err, account) => {
      if (err) {
        console.error('Failed to create a testing account. ' + err.message);
        reject(err);
      }

      const completePath = path.join(__dirname, '/', emailConfigFilename);
      console.log(`Credentials obtained.\n  Writing to '${completePath}'.\n  This should NOT be committed to the repository!`);
      fileUtil.writeFile(emailConfigFilename, JSON.stringify(account));

      // After writing the file, return the new account information
      resolve(account);
    });
  });
}

async function getEmailAccount() {
  try {
    const accountString = fileUtil.readFile(emailConfigFilename);
    const account = JSON.parse(accountString);
    if (typeof account.user === 'undefined') {
      return setupTestAccount();
    }
    return account;
  } catch (_) {
    // File doesn't exist, so create a new account
    return setupTestAccount();
  }
}

/**
 * Create reusable transporter object using the default SMTP transport
 */
export async function getTestTransportOptions() {
  const account = await getEmailAccount();
  return {
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: account.user, // generated ethereal user
      pass: account.pass  // generated ethereal password
    }
  };
}
