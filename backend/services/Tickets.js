const { sendMail } = require("./Nodemailer");

const sendTickets = async () => {
    await sendMail();
};

module.exports = {sendTickets};