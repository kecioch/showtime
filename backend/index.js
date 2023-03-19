const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

const MOVIES_DATA = [
  {
    title: "Interstellar",
    subtitle: "Ein Blick in die Sterne",
    description: "Ist ein toller Film",
    poster: "https://www.filmpa.de/images/Breite_400px_RGB/p_95980.jpg",
  },
  {
    title: "Top Gun",
    subtitle: "Maverick ist zurück!",
    description: "Ist ein toller Film",
    poster: "https://www.filmpa.de/images/Breite_400px_RGB/p_95980.jpg",
  },
  {
    title: "Avatar",
    subtitle: "Angriff der Blauen",
    description: "Ist ein toller Film",
    poster: "https://www.filmpa.de/images/Breite_400px_RGB/p_95980.jpg",
  },
  {
    title: "Shutter Island",
    subtitle: "Nichts ist wie es scheint",
    description: "Ist ein toller Film",
    poster: "https://www.filmpa.de/images/Breite_400px_RGB/p_95980.jpg",
  },
  {
    title: "Inception",
    subtitle: "Ein Traum in einem Traum",
    description: "Ist ein toller Film",
    poster: "https://www.filmpa.de/images/Breite_400px_RGB/p_95980.jpg",
  },
];

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log("REQUEST ON '/'");
  res.send("HELLO FROM BACKEND");
});

app.get("/movies", (req, res) => {
  console.log("REQUEST /movies");
  res.send(MOVIES_DATA);
});

app.get("/movies/:name", (req, res) => {
  const name = req.params.name;
  let foundMovie;

  if (name)
    foundMovie = MOVIES_DATA.find(
      (movie) => movie.title.toLocaleLowerCase() === name.toLocaleLowerCase()
    );

  if (foundMovie) res.status(200).send(foundMovie);
  else res.status(404).send({code: 404, message: "movie not found"});
});

app.post("/movies", (req, res) => {
  console.log(req.body);
  const body = req.body;
  const movie = {
    title: body.title,
    subtitle: body.subtitle,
    description: body.description,
    poster: body.poster,
  };
  MOVIES_DATA.push(movie);
  res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
