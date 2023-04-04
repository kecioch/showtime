const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const express = require("express");
const router = express.Router();

// BASIC URL /search

router.get("/movie", async (req, res) => {
  const TMDB_URL = process.env.TMDB_URL;
  const TMDB_KEY = process.env.TMDB_KEY;
  const TMDB_URL_IMG = process.env.TMDB_URL_IMG;
  
  try {
    const name = req.query.name;
    const tmdbUrlSearch = `${TMDB_URL}/search/movie?api_key=${TMDB_KEY}`;
    const resSearch = await fetch(`${tmdbUrlSearch}&query=${name}`);
    const dataSearch = await resSearch.json();

    const movieID = dataSearch.results[0].id;
    const queryParams =
      "language=de&append_to_response=videos,images,credits,keywords,release_dates";
    const tmdbUrlMovie = `${TMDB_URL}/movie/${movieID}?api_key=${TMDB_KEY}&${queryParams}`;
    const resMovie = await fetch(tmdbUrlMovie);
    const dataMovie = await resMovie.json();
    console.log(dataMovie);

    const releaseDate = dataMovie.release_dates.results.find(
      (el) => el.iso_3166_1 === "DE"
    );
    const ageRestriction = parseInt(releaseDate.release_dates[0].certification);
    const productionCountry = dataMovie.production_countries[0].iso_3166_1;
    const productionYear = parseInt(dataMovie.release_date.slice(0, 4));
    const keywords = dataMovie.keywords.keywords.map((el) => el.name);
    const genres = dataMovie.genres.map((el) => el.name);
    const cast = dataMovie.credits.cast.map((el) => ({
      name: el.name,
      roleName: el.character,
      img: el.profile_path
        ? `${TMDB_URL_IMG}/w500${el.profile_path}`
        : "https://www.ssrl-uark.com/wp-content/uploads/2014/06/no-profile-image.png",
    }));
    const director = dataMovie.credits.crew
      .filter((el) => el.job === "Director")
      .map((el) => el.name)
      .join(", ");
    const writer = dataMovie.credits.crew
      .filter((el) => el.job === "Writer" || el.job === "Screenplay")
      .map((el) => el.name)
      .join(", ");

    const movie = {
      title: dataMovie.title,
      subtitle: dataMovie.tagline,
      originalTitle: dataMovie.original_title,
      description: dataMovie.overview,
      runtime: dataMovie.runtime,
      release: {
        productionCountry,
        productionYear,
        ageRestriction: ageRestriction,
      },
      genres,
      keywords,
      credits: {
        crew: {
          director: { name: director },
          screenwriter: { name: writer },
        },
        cast,
      },
      media: {
        images: {
          poster: `${TMDB_URL_IMG}/w500${dataMovie.poster_path}`,
        },
      },
    };

    console.log(movie);
    res.status(200).send(movie);
  } catch (err) {
    res.status(400).json({ code: 400, message: err.message })
  }
});

module.exports = router;