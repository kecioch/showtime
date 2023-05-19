const { sendMail } = require("./Nodemailer");
const fs = require("fs");
const path = require("path");
const ical = require("ical-generator");

const sendTicket = async (ticket) => {
  try {
    console.log("SEND TICKET");
    const { customer, code, seats, screening, datetime, id } = ticket;
    console.log("T_datetime", datetime);

    const movie = screening.scheduledScreening.movie;
    const cinema = screening.scheduledScreening.cinema;

    // Load QRCode
    const ticketFilePath =
      process.env.NODE_ENV !== "production"
        ? path.resolve(__dirname, `../static/${code.filename}`)
        : `/tmp/${code.filename}`;
    const codeImg = fs.readFileSync(ticketFilePath);

    // Create ical event
    const calendar = ical({
      name: "Filmvorführung | Showtime",
    });

    calendar.createEvent({
      start: datetime,
      end: datetime,
      summary: movie.title,
      location: cinema.title,
      organizer: {
        name: "Showtime",
        email: process.env.MAIL_USERNAME,
      },
    });

    const icalString = calendar.toString();

    // Create mail information
    const idHTML = `<h2>ID: ${id}</h2>`;
    const movieHTML = `<h3>${movie.title}</h2>`;
    const cinemaHTML = `<h3>${cinema.title}</h2>`;
    const datetimeHTML = `<h2>${datetime.toLocaleString("de-de", {
      timeZone: process.env.TIME_ZONE || "Europe/Berlin",
    })}</h2>`;
    let seatsHTML = "";
    seats.map(
      (seat) =>
        (seatsHTML += `<li>Reihe: ${seat.row} / Platz: ${seat.col} [${seat.type.title}]</li>`)
    );

    const mail = {
      to: customer.email, //process.env.MAIL_SEND_TO,
      subject: "Ticketbestellung",
      html: `<h1>Ihre Tickets wurden gebucht!</h1>${idHTML}<img src="cid:ticket"/>${
        movieHTML + cinemaHTML + datetimeHTML
      }<br/><h3>Sitzplatz:</h3><ul>${seatsHTML}</ul>`,
      attachments: [
        {
          filename: code.filename,
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
