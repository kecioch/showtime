const mongoose = require("mongoose");
const User = require("./User");

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
    type: String,
  },
  checked: {
    type: Boolean,
    default: false,
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

ticketSchema.pre("deleteMany", async function (next) {
  try {
    const entities = await this.model.find(this.getQuery());
    this._entitiesToDelete = entities; // Store the entities to be deleted
    next();
  } catch (error) {
    next(error);
  }
});

ticketSchema.post("deleteMany", async function (doc) {
  try {
    const deletedEntities = this._entitiesToDelete;
    const ticketIDs = deletedEntities.map((el) => el._id);
    await User.updateMany(
      { tickets: { $in: ticketIDs } },
      { $pull: { tickets: { $in: ticketIDs } } }
    );
  } catch (error) {
    console.log(error);
  }
});

module.exports = mongoose.model("Ticket", ticketSchema);
