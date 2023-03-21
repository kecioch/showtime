const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  subtitle: {
    required: true,
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
          required: true,
          type: String,
        },
        img: {
          required: true,
          type: String
        }
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
  },
});

module.exports = mongoose.model("Movie", movieSchema);
