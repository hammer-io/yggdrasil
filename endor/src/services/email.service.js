import nodemailer from 'nodemailer';


export default class EmailService {
  constructor(fromAddress, logger, transportOptions) {
    this.from = fromAddress;
    this.log = logger;
    this.transporter = nodemailer.createTransport(transportOptions);
  }

  async emailInvite(user, project, invite) {
    return new Promise((resolve, reject) => {
      const mailOptions = {
        from: this.from,
        to: user.email,
        subject: `Invitation to contribute to project ${project.projectName}`,
        text: `Hello ${user.firstName}! You've been invited to contribute to project ${project.projectName}. Please visit the following link to accept or decline this invitation: https://hammer-io.github.io/api/v1/invites/${invite.id}`, // plain text body
        html: `<h2>Hello ${user.firstName}!</h2><p>You've been invited to contribute to project ${project.projectName}. Please visit the following link to accept or decline this invitation: <a href="https://hammer-io.github.io/api/v1/invites/${invite.id}" target="_blank">https://hammer-io.github.io/api/v1/invites/${invite.id}</a></p>` // html body
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
