import styles from "./ProgramPlan.module.css";
import MovieListItem from "./MovieListItem";
import React from "react";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../constants";
import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../ui/LoadingSpinner";
import { AnimatePresence, motion } from "framer-motion";
import ProgramPlanFilter from "./ProgramPlanFilter";
import useQueryParams from "../../hooks/useQueryParams";

const ProgramPlan = (props) => {
  const [movies, setMovies] = useState();
  const [timeFilter, setTimeFilter] = useState();
  const [fskFilter, setFskFilter] = useState([]);
  const [genreFilter, setGenreFilter] = useState([]);
  const [ageOptions, setAgeOptions] = useState([]);
  const [genreOptions, setGenreOptions] = useState([]);

  const { fetch, isFetching } = useFetch();
  const { getParameter, setParameter, deleteParameter } = useQueryParams();

  const movieList = movies
    ?.filter((movie) => {
      if (timeFilter === "all") return true;
      else if (timeFilter === "today") {
        const today = new Date().toLocaleDateString("en-US", {
          weekday: "long",
        });
        return movie.screenings.find(
          (screenings) => screenings.weekday === today
        );
      } else if (timeFilter === "weekend") {
        return movie.screenings.find((screenings) =>
          ["Friday", "Saturday", "Sunday"].includes(screenings.weekday)
        );
      }
      return true;
    })
    .filter((movie) => {
      if (genreFilter?.length <= 0) return true;
      return genreFilter.every((genre) => movie.genres.includes(genre));
      // return genreFilter.some((genre) => movie.genres.includes(genre));
    })
    .filter((movie) => {
      if (fskFilter?.length <= 0) return true;
      return fskFilter.includes(movie.release.ageRestriction.toString());
    })
    .map((movie, i) => (
      <MovieListItem
        key={i}
        movie={movie}
        className={i > 0 ? styles.border : styles.noneBorder}
      />
    ));

  useEffect(() => {
    const genreParams = getParameter("genres");
    if (genreParams) setGenreFilter(genreParams.split(","));

    const fskParams = getParameter("fsk");
    if (fskParams) setFskFilter(fskParams.split(","));

    const timeParam = getParameter("time");
    if (timeParam) setTimeFilter(timeParam);

    fetch.get(`${BACKEND_URL}/movies?screenings=true`).then((res) => {
      setMovies(res.data);

      const genres = [];
      res?.data?.forEach((movie) => {
        movie.genres.forEach((genre) => {
          if (!genres.includes(genre)) genres.push(genre);
        });
      });
      setGenreOptions(genres.sort());

      const ages = [];
      res?.data?.forEach((movie) => {
        const age = movie.release.ageRestriction.toString();
        if (!ages.includes(age)) ages.push(age);
      });
      setAgeOptions(ages.sort((elA, elB) => elA - elB));
    });
  }, []);

  const genreFilterHandler = (genres) => {
    if (genres.length > 0) setParameter("genres", genres);
    else deleteParameter("genres");
    setGenreFilter(genres);
  };

  const fskFilterHandler = (fsk) => {
    if (fsk.length > 0) setParameter("fsk", fsk);
    else deleteParameter("fsk");
    setFskFilter(fsk);
  };

  const timeFilterHandler = (time) => {
    if (time) setParameter("time", time);
    else deleteParameter("time");
    setTimeFilter(time);
  };

  const genreOptionsData = genreOptions.map((genre) => ({
    value: genre,
    checked: genreFilter.includes(genre),
  }));
  const ageOptionsData = ageOptions.map((age) => ({
    value: age,
    checked: fskFilter.includes(age),
  }));
  const timeOptionsData = {
    default: timeFilter,
    options: [
      { text: "Komplettes Programm", value: "all" },
      { text: "Heute", value: "today" },
      { text: "Wochenende", value: "weekend" },
    ],
  };

  return (
    <>
      {isFetching && <LoadingSpinner />}
      {!isFetching && movies?.length > 0 && (
        <>
          <ProgramPlanFilter
            timeOptions={timeOptionsData}
            genreOptions={genreOptionsData}
            ageOptions={ageOptionsData}
            setTimeFilter={timeFilterHandler}
            setGenreFilter={genreFilterHandler}
            setFskFilter={fskFilterHandler}
          />
          <motion.div className={styles.programPlan}>
            <AnimatePresence>{movieList}</AnimatePresence>
          </motion.div>
        </>
      )}
      {!isFetching &&
        (!movies || movies?.length <= 0 || movieList?.length <= 0) && (
          <h2 className="text-muted text-center mt-4 mb-3">
            Keine Filme vorhanden
          </h2>
        )}
    </>
  );
};

export default ProgramPlan;
