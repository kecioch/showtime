const mongoose = require("mongoose");

const seatTypeSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("SeatType", seatTypeSchema);