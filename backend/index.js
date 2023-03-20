require('dotenv').config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL

const Movie = require("./models/Movie");

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log("GET /");
  res.send("HELLO FROM BACKEND");
});

app.get("/movies", async (req, res) => {
  console.log("GET /movies");
  try {
      const data = await Movie.find();
      res.json(data);
  } catch(err) {
    res.status(500).json({code:500, message: err.message});
  }
});

app.get("/movies/:title", async (req, res) => {
  const title = req.params.title;
  let foundMovie;

  if (title)
    foundMovie = await Movie.findOne({title});

  if (foundMovie) res.status(200).send(foundMovie);
  else res.status(404).send({code: 404, message: "movie not found"});
});

app.post("/movies", async (req, res) => {
  console.log("POST /movies");
  console.log(req.body);
  const body = req.body;
  const movie = new Movie({
    title: body.title,
    subtitle: body.subtitle,
    description: body.description,
    poster: body.poster,
  });
  try {
    const savedMovie = await movie.save();
    res.status(200).json(savedMovie);
  } catch (err) {
    res.status(400).json({code: 400, message: err.message});
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
