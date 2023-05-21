const mongoose = require("mongoose");

const Screening = require("./Screening"); 

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
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Regular expression for "hh:mm" format
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        return timeRegex.test(value);
      },
      message: "Invalid time format. Use 'hh:mm' format.",
    },
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

scheduledScreeningSchema.post("findOneAndDelete", async function (doc) {
  try {
    const res = await Screening.deleteMany({scheduledScreening: doc.id});
  } catch (error) {
    console.log(error);
  }
});

module.exports = mongoose.model("ScheduledScreening", scheduledScreeningSchema);
