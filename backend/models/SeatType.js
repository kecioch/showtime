const mongoose = require("mongoose");

const Cinema = require("./Cinema");

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

seatTypeSchema.pre("findOneAndDelete", async function (next) {
  try {
    const query = this.getQuery();
    const id = query._id;
    let hasReferences = false;
    const cinemas = (await Cinema.find().populate("map.rows.type")).filter(
      (cinema) => {
        return cinema.map.rows.forEach((row) => {
          return row.forEach((seat) => {
            if (seat?.type?.id === id) hasReferences = true;
            return seat?.type?.id === id;
          });
        });
      }
    );

    if (hasReferences) {
      const error = new Error(
        "Sitzplatztyp kann nicht gelöscht werden! Es gibt nocht Kinosäle, die ihn referenzieren."
      );
      return next(error);
    }
  } catch (error) {
    return next(error);
  }

  next();
});

module.exports = mongoose.model("SeatType", seatTypeSchema);
