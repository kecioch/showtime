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
  original_title: {
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
    production_country: {
      required: true,
      type: String,
    },
    production_year: {
      required: true,
      type: Number,
    },
    age_restriction: {
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
        character_name: {
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
  },
});

module.exports = mongoose.model("Movie", movieSchema);
