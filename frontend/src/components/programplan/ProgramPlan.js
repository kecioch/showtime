import styles from "./ProgramPlan.module.css";
import MovieListItem from "./MovieListItem";
import Button from "react-bootstrap/Button";
import React from "react";
import { Link } from "react-router-dom";
import Content from "../../ui/Content";
import { useEffect, useState } from "react";

const ProgramPlan = (props) => {
  const [movies, setMovies] = useState();

  let movieList = [];
  if (movies) {
    console.log("MOVIES:", movies);
    movieList = movies.map((movie, i) => (
      <MovieListItem key={i} movie={movie} />
    ));
  }

  let content = <h2>Keine Filme vorhanden</h2>;
  if (movieList.length > 0)
    content = <div className={styles.programPlan}>{movieList}</div>;

  useEffect(() => {
    fetch("http://localhost:4000/movies")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setMovies(data);
      });
  }, []);

  return (
    <Content>
      <div style={{ width: "100%" }}>
        <Link to="/movies/new">
          <Button className="mb-4" variant="primary">
            Neuen Film hinzufügen
          </Button>
        </Link>
      </div>
      {content}
    </Content>
  );
};

export default ProgramPlan;
