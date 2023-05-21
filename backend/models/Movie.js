const mongoose = require("mongoose");
const ScheduledScreening = require("./ScheduledScreening");

const movieSchema = new mongoose.Schema({
  title: {
    required: true,
    unique: true,
    type: String,
  },
  subtitle: {
    required: false,
    type: String,
  },
  originalTitle: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  startdate: {
    type: Date,
    default: Date.now,
  },
  is3D: {
    type: Boolean,
    default: false,
  },
  runtime: {
    required: true,
    type: Number,
  },
  release: {
    productionCountry: {
      required: true,
      type: String,
    },
    productionYear: {
      required: true,
      type: Number,
    },
    ageRestriction: {
      required: true,
      type: Number,
    },
  },
  keywords: [
    {
      required: false,
      type: String,
    },
  ],
  genres: [
    {
      required: true,
      type: String,
    },
  ],
  credits: {
    crew: {
      director: {
        name: {
          required: true,
          type: String,
        },
      },
      screenwriter: {
        name: {
          required: true,
          type: String,
        },
      },
    },
    cast: [
      {
        name: {
          required: true,
          type: String,
        },
        roleName: {
          type: String,
        },
        img: {
          required: true,
          type: String,
        },
      },
    ],
  },
  media: {
    images: {
      poster: {
        required: true,
        type: String,
      },
    },
    videos: {
      trailer: {
        key: { type: String },
        name: { type: String },
        site: { type: String },
      },
    },
  },
});

movieSchema.pre("findOneAndDelete", async function (next) {
  try {
    const query = this.getQuery();
    const scheduledScreenings = (
      await ScheduledScreening.find().populate("movie")
    ).filter((el) => el.movie.title === query.title);
    const hasReferences = scheduledScreenings.length > 0;
    if (hasReferences) {
      const error = new Error(
        "Film kann nicht gelöscht werden! Es gibt nocht Filmvorführungen, die ihn referenzieren."
      );
      return next(error);
    }
  } catch (error) {
    return next(error);
  }

  next();
});

module.exports = mongoose.model("Movie", movieSchema);
