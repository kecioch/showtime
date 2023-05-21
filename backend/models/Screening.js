const mongoose = require("mongoose");

const Ticket = require("./Ticket");
const Order = require("./Order");

const screeningSchema = new mongoose.Schema({
  scheduledScreening: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ScheduledScreening",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  bookedSeats: [
    {
      row: { type: Number, required: true },
      col: { type: Number, required: true },
    },
  ],
});

screeningSchema.pre("deleteMany", async function (next) {
  try {
    const entities = await this.model.find(this.getQuery());
    this._entitiesToDelete = entities; // Store the entities to be deleted
    next();
  } catch (error) {
    next(error);
  }
});

screeningSchema.post("deleteMany", async function (doc) {
  try {
    const deletedEntities = this._entitiesToDelete;
    const screeningIDs = deletedEntities.map((el) => el._id);
    await Ticket.deleteMany({ screening: { $in: screeningIDs } });
    await Order.deleteMany({ screening: { $in: screeningIDs } });
  } catch (error) {
    console.log(error);
  }
});

module.exports = mongoose.model("Screening", screeningSchema);
