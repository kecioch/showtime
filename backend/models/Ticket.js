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
  codeSVG: {
    type: String
  },
  checked: {
    type: Boolean,
    default: false
  },
  seats: [
    {
      row: { type: Number, required: true },
      col: { type: Number, required: true },
      type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SeatType",
        required: true,
      },
    },
  ],
  screening: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Screening",
    required: true,
  },
  datetime: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Ticket", ticketSchema);
