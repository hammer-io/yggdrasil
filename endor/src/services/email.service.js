import nodemailer from 'nodemailer';
import * as emailInvite from './emails/invite.email';
import InviteService from '../services/invites.service';


export default class EmailService {
  constructor(fromAddress, logger, transportOptions) {
    this.from = fromAddress;
    this.log = logger;
    this.transporter = nodemailer.createTransport(transportOptions);
  }

  async emailInvite(user, project, invite) {
    return new Promise((resolve, reject) => {
      const expirationDate = InviteService.getInviteExpirationDateString(invite);
      const manageInvitesUrl = `https://hammer-io.github.io/api/v1/invites/${invite.id}`;
      const mailOptions = {
        from: this.from,
        to: user.email,
        subject: `Invitation to contribute to project ${project.projectName}`,
        text: emailInvite.getPlaintext(
          project.projectName,
          user.firstName,
          expirationDate,
          manageInvitesUrl
        ),
        html: emailInvite.getHtml(
          project.projectName,
          user.firstName,
          expirationDate,
          manageInvitesUrl
        )
      };

      // send mail with defined transport object
      return this.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        }
        this.log.info(`Message sent: ${info.messageId}`);
        resolve(info);
      });
    });
  }
}
