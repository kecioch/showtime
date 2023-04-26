const { sendMail } = require("./Nodemailer");
const fs = require("fs");
const path = require("path");

const sendTicket = async (ticket) => {
  try {
    // Load QRCode
    const ticketFilePath = path.resolve(
      __dirname,
      `../static/${ticket.code.filename}`
    );
    const codeImg = fs.readFileSync(ticketFilePath);

    // Create mail informtion
    const mail = {
      to: process.env.MAIL_SEND_TO,
      subject: "Ticketbestellung",
      html: `<h1>Ihre Tickets wurden gebucht!</h1><img src="cid:ticket"/>`,
      attachments: [
        {
          filename: ticket.code.filename,
          content: codeImg,
          cid: "ticket",
        },
      ],
    };

    // Send mail to customer
    await sendMail(mail);

    // Delete QRCode
    fs.unlinkSync(ticketFilePath);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { sendTicket };
