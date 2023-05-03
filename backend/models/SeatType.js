const mongoose = require("mongoose");

const seatTypeSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  colorHEX: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(v);
      },
      message: (props) => `${props.value} is not a valid hex color code!`,
    },
  },
});

module.exports = mongoose.model("SeatType", seatTypeSchema);
