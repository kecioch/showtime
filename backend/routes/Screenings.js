const express = require("express");
const router = express.Router();

const ScreeningScheduled = require("../models/ScreeningScheduled");

// BASIC URL /screenings

router.get("/schedule", async (req, res) => {
  const screeningsScheduled = await ScreeningScheduled.find()
    .populate("movie")
    .populate("cinema");
  res.send(screeningsScheduled);
});

router.post("/schedule", async (req, res) => {
  console.log("POST /screenings/schedule");
  console.log(req.body);
  const body = req.body;

  try {
    const screening = new ScreeningScheduled(body);
    const savedScreening = await screening.save();
    res.status(200).json(savedScreening);
  } catch (err) {
    console.log(err);
    res.status(400).json({ code: 400, message: err.message });
  }
});

module.exports = router;
