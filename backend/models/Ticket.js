const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  customer: {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
//   seats: {

//   },
  screening: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Screening",
    required: true,
  },
  //   movie: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Movie",
  //     required: true,
  //   },
  //   cinema: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Cinema",
  //     required: true,
  //   },
  datetime: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Ticket", ticketSchema);
