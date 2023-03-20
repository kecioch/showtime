const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    subtitle: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    poster: {
        required: true,
        type: String
    }
});

module.exports = mongoose.model("Movie", movieSchema);