import styles from "./ProgramPlan.module.css";
import MovieListItem from "./MovieListItem";
import React from "react";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../constants";
import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../ui/LoadingSpinner";

const ProgramPlan = (props) => {
  const [movies, setMovies] = useState();
  const { fetch, isFetching } = useFetch();

  let movieList = [];
  if (movies) {
    console.log("MOVIES:", movies);
    movieList = movies.map((movie, i) => (
      <MovieListItem
        key={i}
        movie={movie}
        className={i > 0 ? styles.border : styles.noneBorder}
      />
    ));
  }

  let content = (
    <h2 className="text-muted text-center mt-4 mb-3">Keine Filme vorhanden</h2>
  );
  if (movieList.length > 0)
    content = <div className={styles.programPlan}>{movieList}</div>;

  useEffect(() => {
    fetch.get(`${BACKEND_URL}/movies`).then((res) => {
      console.log(res);
      setMovies(res.data);
    });
  }, []);

  return (
    <>
      {isFetching && <LoadingSpinner />}
      {!isFetching && content}
    </>
  );
};

export default ProgramPlan;
