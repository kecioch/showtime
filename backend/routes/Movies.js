const express = require("express");
const router = express.Router();

const Movie = require("../models/Movie");

// BASIC URL /movies

router.get("/", async (req, res) => {
  console.log("GET /movies");
  try {
    const data = await Movie.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ code: 500, message: err.message });
  }
});

router.get("/:title", async (req, res) => {
  const title = req.params.title;
  let foundMovie;

  if (title) foundMovie = await Movie.findOne({ title });

  if (foundMovie) res.status(200).send(foundMovie);
  else res.status(404).send({ code: 404, message: "movie not found" });
});

router.delete("/:title", async (req, res) => {
  const title = req.params.title;
  console.log(`DELETE /cinemas/${title}`);

  try {
    const movie = await Movie.findOneAndDelete({ title });
    res.status(200).send(movie);
  } catch (err) {
    res.status(404).send({ code: 404, message: "delete error" });
  }
});

router.post("/", async (req, res) => {
  console.log("POST /movies");
  console.log(req.body);
  const body = req.body;

  try {
    const movie = new Movie(body);
    const savedMovie = await movie.save();
    res.status(200).json(savedMovie);
  } catch (err) {
    console.log(err);
    res.status(400).json({ code: 400, message: err.message });
  }
});

module.exports = router;
