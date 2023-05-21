const express = require("express");
const router = express.Router();

const { authorization } = require("../services/Authentication");
const {ROLES} = require("../constants");
const authAdmin = authorization(ROLES.ADMIN);

const Cinema = require("../models/Cinema");
const SeatType = require("../models/SeatType");

// BASE URL /cinemas
router.get("/", async (req, res) => {
  const cinemas = await Cinema.find();
  res.status(200).json({ data: cinemas });
});

router.post("/", authAdmin, async (req, res) => {
  console.log("POST /cinemas");
  console.log(req.body);
  const body = req.body;

  try {
    const cinema = new Cinema(body);
    console.log(cinema);
    const savedCinema = await cinema.save();
    res.status(200).json({ data: savedCinema });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

router.get("/:title", async (req, res) => {
  const title = req.params.title;
  let foundCinema;
  console.log(`GET /cinemas/${title}`);

  if (title)
    foundCinema = await Cinema.findOne({ title }).populate("map.rows.type");

  if (foundCinema) res.status(200).json({ data: foundCinema });
  else res.status(404).send({ message: "cinema not found" });
});

router.put("/:title", authAdmin, async (req, res) => {
  console.log("PUT /cinemas");
  const title = req.params.title;
  const body = req.body;
  console.log(body);
  try {
    const updatedCinema = await Cinema.findOneAndUpdate({ title }, body);
    console.log("UPDATED", updatedCinema);
    res.status(200).json({ data: updatedCinema });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:title", authAdmin, async (req, res) => {
  const title = req.params.title;
  console.log(`DELETE /cinemas/${title}`);

  try {
    const cinema = await Cinema.findOneAndDelete({ title });
    res.status(200).json({ data: cinema });
  } catch (err) {
    res.status(404).json({ message: err.message || "delete error" });
  }
});

module.exports = router;
