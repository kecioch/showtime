const { sendMail } = require("./Nodemailer");
const fs = require("fs");
const path = require("path");
const ical = require("ical-generator");

const sendTicket = async (ticket) => {
  try {
    // Load QRCode
    const ticketFilePath = path.resolve(
      __dirname,
      `../static/${ticket.code.filename}`
    );
    const codeImg = fs.readFileSync(ticketFilePath);

    // Create ical event
    const calendar = ical({
      name: "Filmvorführung | Showtime",
    });

    calendar.createEvent({
      start: new Date(),
      end: new Date(),
      summary: "John Wick: Chapter 4",
      location: "Kino 1",
      organizer: {
        name: "Showtime",
        email: process.env.MAIL_USERNAME
      }
    });

    const icalString = calendar.toString();

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
      icalEvent: {
        content: icalString,
      },
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
