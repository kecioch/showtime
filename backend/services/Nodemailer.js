const nodemailer = require("nodemailer");

const send = async (mail) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
  });

  let info = await transporter.sendMail({
    from: `"Showtime 🎬" <${process.env.MAIL_USERNAME}>`,
    to: mail.to, 
    priority: "high",
    subject: mail.subject,
    html: mail.html,
    attachments: mail.attachments,
    icalEvent: mail.icalEvent
  });

  console.log("Mail sent: %s", info.messageId);
};

const sendMail = async (mail) => {
  send(mail).catch(console.error);
};

module.exports = { sendMail };
