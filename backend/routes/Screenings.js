const express = require("express");
const router = express.Router();

const ScheduledScreening = require("../models/ScheduledScreening");

// BASIC URL /screenings

router.get("/schedule", async (req, res) => {
  const scheduledScreenings = await ScheduledScreening.find()
    .populate("movie")
    .populate("cinema");
  res.send(scheduledScreenings);
});

router.post("/schedule", async (req, res) => {
  console.log("POST /screenings/schedule");
  console.log(req.body);
  const body = req.body;

  try {
    const screening = new ScheduledScreening(body);
    let savedScreening = await screening.save();
    savedScreening = await savedScreening.populate("movie");
    savedScreening = await savedScreening.populate("cinema");
    res.status(200).json(savedScreening);
  } catch (err) {
    console.log(err);
    res.status(400).json({ code: 400, message: err.message });
  }
});

router.delete("/schedule/:id", async (req, res) => {
  const id = req.params.id;
  console.log(`DELETE /screenings/schedule/${id}`);

  try {
    const deletedScreening = await ScheduledScreening.findByIdAndDelete(id);
    res.status(200).send(deletedScreening);
  } catch (err) {
    res.status(404).send({ code: 404, message: "delete error" });
  }
});

module.exports = router;
