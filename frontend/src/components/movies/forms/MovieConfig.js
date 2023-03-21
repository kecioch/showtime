import React, { useState } from "react";
import MovieForm from "./MovieForm";
import Button from "react-bootstrap/Button";
import { BACKEND_URL } from "../../../constants";

const MovieConfig = (props) => {
  const [searchInput, setSearchInput] = useState();
  const [searchedMovie, setSearchedMovie] = useState();

  const searchMovieHandler = async (ev) => {
    if (ev.key !== "Enter") return;

    console.log(`${BACKEND_URL}/search/movie?name=${searchInput}`);
    const res = await fetch(`${BACKEND_URL}/search/movie?name=${searchInput}`)
    const data = await res.json();

    if(res.status === 200)
      setSearchedMovie(data);
  };

  const submitHandler = async (movie) => {
    const res = await props.onSubmit(movie);
    console.log("CONFIG RES", res);
    if (res?.code === 200) {
      console.log("DELTE SEACRCHED");
      setSearchedMovie();
    }
    return res;
  };

  return (
    <React.Fragment>
      <label htmlFor="searchMovie">Film in Datenbank suchen</label>
      <input
        className="form-control mr-sm-2 mt-2"
        type="search"
        placeholder="Suche"
        aria-label="Suche"
        style={{ zIndex: "1" }}
        id="searchMovie"
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={searchMovieHandler}
      />
      {/* <ListGroup className={styles.listGroup} variant="flush">
      <ListGroup.Item>Cras justo odio</ListGroup.Item>
      <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
      <ListGroup.Item>Morbi leo risus</ListGroup.Item>
      <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
      <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
    </ListGroup> */}
      <MovieForm
        onSubmit={submitHandler}
        isNew={props.isNew}
        default={searchedMovie}
      />
    </React.Fragment>
  );
};

export default MovieConfig;