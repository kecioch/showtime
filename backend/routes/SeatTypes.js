const express = require("express");
const router = express.Router();

const SeatType = require("../models/SeatType");

// BASE URL /seattypes

router.get("/", async (req, res) => {
  const seatTypes = await SeatType.find();
  res.send(seatTypes);
});

router.post("/", async (req, res) => {
  console.log("POST /seattypes");
  console.log(req.body);
  const body = req.body;

  try {
    const seatType = new SeatType(body);
    console.log(seatType);
    const savedSeatType = await seatType.save();
    res.status(200).json(savedSeatType);
  } catch (err) {
    console.log(err);
    res.status(400).json({ code: 400, message: err.message });
  }
});

module.exports = router;
