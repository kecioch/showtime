const express = require("express");
const router = express.Router();

const { authorization } = require("../services/Authentication");
const { ROLES } = require("../constants");
const authAdmin = authorization(ROLES.ADMIN);

const Movie = require("../models/Movie");
const ScheduledScreening = require("../models/ScheduledScreening");

// BASIC URL /movies

router.get("/", async (req, res) => {
  console.log("GET /movies");
  const { screenings } = req.query;
  try {
    const movies = await Movie.find();
    if (!screenings) return res.status(200).json({ data: movies });
    console.log("MOVIES LEN", movies.length);
    const moviesDetailed = [];
    for (const movie of movies) {
      const screeningsScheduled = await ScheduledScreening.find({
        movie: movie.id,
      });
      const movieData = {
        ...movie.toObject(),
        screenings: screeningsScheduled,
      };
      moviesDetailed.push(movieData);
    }
    console.log(moviesDetailed);
    return res.status(200).json({ data: moviesDetailed });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

router.post("/", authAdmin, async (req, res) => {
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

router.put("/:id", authAdmin, async (req, res) => {
  console.log("PUT /movies");
  const { id } = req.params;
  const body = req.body;
  console.log(body);
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(id, body, { new: true });
    console.log("UPDATED", updatedMovie);
    res.status(200).json({ data: updatedMovie });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:title", authAdmin, async (req, res) => {
  const title = req.params.title;
  console.log(`DELETE /movies/${title}`);

  try {
    const movie = await Movie.findOneAndDelete({ title });
    res.status(200).json({ data: movie });
  } catch (err) {
    res.status(404).send({ message: err.message || "delete error" });
  }
});

module.exports = router;
