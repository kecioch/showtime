const mongoose = require("mongoose");

const screeningSchema = new mongoose.Schema({
    scheduledScreening: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ScheduledScreening",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    bookedSeats: [{
        row: { type: Number, required: true},
        col: { type: Number, required: true},
    }]
});

module.exports = mongoose.model("Screening", screeningSchema);