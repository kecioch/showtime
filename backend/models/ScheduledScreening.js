const mongoose = require("mongoose");

const scheduledScreeningSchema = new mongoose.Schema({
  weekday: {
    type: String,
    required: true,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  },
  time: {
    type: Date,
    required: true,
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  cinema: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cinema",
    required: true,
  },
});

module.exports = mongoose.model("ScheduledScreening", scheduledScreeningSchema);
