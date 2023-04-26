const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  seats: [
    {
      row: { type: Number, required: true },
      col: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("Order", orderSchema);
