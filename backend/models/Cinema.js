const mongoose = require("mongoose");
const ScheduledScreening = require("./ScheduledScreening");

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

cinemaSchema.pre("findOneAndDelete", async function (next) {
  try {
    const query = this.getQuery();

    const scheduledScreenings = (
      await ScheduledScreening.find().populate("cinema")
    ).filter((el) => el.cinema.title === query.title);

    const hasReferences = scheduledScreenings.length > 0;

    if (hasReferences) {
      const error = new Error(
        "Kinosaal kann nicht gelöscht werden! Es gibt nocht Filmvorführungen, die ihn referenzieren."
      );
      return next(error);
    }
  } catch (error) {
    return next(error);
  }

  next();
});

module.exports = mongoose.model("Cinema", cinemaSchema);
