const nodemailer = require("nodemailer");

const send = async () => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
  });

  let info = await transporter.sendMail({
    from: `"Showtime 🎬" <${process.env.MAIL_USERNAME}>`,
    to: process.env.MAIL_SEND_TO, 
    priority: "high",
    subject: "Ticketbestellung",
    html: "<b>Ihre Tickets wurden gebucht!</b>",
  });

  console.log("Mail sent: %s", info.messageId);
};

const sendMail = async () => {
  send().catch(console.error);
};

module.exports = { sendMail };
