const mongoose = require("mongoose");

const cinemaSchema = new mongoose.Schema({
  title: {
    required: true,
    unique: true,
    type: String,
  },
  map: {
    rows: [
      [
        {
          row: { type: Number, required: true },
          col: { type: Number, required: true },
          status: { type: String, default: "unselected" },
          type: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SeatType",
          },
        },
      ],
    ],
  },
});

module.exports = mongoose.model("Cinema", cinemaSchema);
