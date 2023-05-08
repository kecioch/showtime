const express = require("express");
const router = express.Router();

const Movie = require("../models/Movie");

// BASIC URL /movies

router.get("/", async (req, res) => {
  console.log("GET /movies");
  try {
    const data = await Movie.find();
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  console.log("POST /movies");
  console.log(req.body);
  const body = req.body;

  try {
    const movie = new Movie(body);
    const savedMovie = await movie.save();
    res.status(200).json({ data: savedMovie });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

router.get("/:title", async (req, res) => {
  const title = req.params.title;
  let foundMovie;

  if (title) foundMovie = await Movie.findOne({ title });

  if (foundMovie) res.status(200).json({ data: foundMovie });
  else res.status(404).send({ message: "movie not found" });
});

router.put("/:id", async (req, res) => {
  console.log("PUT /movies");
  const { id } = req.params;
  const body = req.body;
  console.log(body);
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(id, body, {new: true});
    console.log("UPDATED", updatedMovie);
    res.status(200).json({ data: updatedMovie });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:title", async (req, res) => {
  const title = req.params.title;
  console.log(`DELETE /cinemas/${title}`);

  try {
    const movie = await Movie.findOneAndDelete({ title });
    res.status(200).json({ data: movie });
  } catch (err) {
    res.status(404).send({ message: "delete error" });
  }
});

module.exports = router;
