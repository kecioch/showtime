const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  screening: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Screening",
    required: true,
  },
  customer: {
    name: { type: String, required: true },
    email: { 
      type: String,
      required: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    }
  },
  completed: {
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
});

module.exports = mongoose.model("Order", orderSchema);
