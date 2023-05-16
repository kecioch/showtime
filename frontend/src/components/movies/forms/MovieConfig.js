import React, { useEffect, useState } from "react";
import MovieForm from "./MovieForm";
import { BACKEND_URL } from "../../../constants";
import useFetch from "../../../hooks/useFetch";
import SearchInput from "../../ui/SearchInput";

const MovieConfig = (props) => {
  const [searchInput, setSearchInput] = useState();
  const [defaultMovie, setDefaultMovie] = useState();
  const { fetch, isFetching, errorMsg } = useFetch();

  const onSearchInput = (ev) => {
    if (ev.key !== "Enter") return;
    searchMovieHandler();
  };

  const searchMovieHandler = async () => {
    if (isFetching) return;

    const res = await fetch.get(
      `${BACKEND_URL}/search/movie?name=${searchInput}`
    );

    if (res.status === 200) setDefaultMovie(res.data);
  };

  const submitHandler = async (movie) => {
    const res = await props.onSubmit(movie);
    if (res?.status === 200 && props.isNew) {
      setDefaultMovie();
    }
    return res;
  };

  useEffect(() => {
    if (props.isNew) return;
    setDefaultMovie(props.default);
  }, [props.isNew, props.default]);

  const errorInfo = errorMsg && <p className="text-danger">{errorMsg}</p>;

  return (
    <React.Fragment>
      <label htmlFor="searchMovie">Film in Datenbank suchen</label>
      <SearchInput
        className="mt-2"
        placeholder="Suche"
        aria-label="Suche"
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={onSearchInput}
        onClick={searchMovieHandler}
        isLoading={isFetching}
      />
      {errorInfo}
      <MovieForm
        onSubmit={submitHandler}
        isNew={props.isNew}
        default={defaultMovie}
        error={props.error}
        isLoading={props.isLoading}
      />
    </React.Fragment>
  );
};

export default MovieConfig;
