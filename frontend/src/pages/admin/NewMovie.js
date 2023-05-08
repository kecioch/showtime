import Container from "../../components/ui/Container";
import Content from "../../components/ui/Content";
import styles from "./NewMovie.module.css";
import { BACKEND_URL } from "../../constants";
import MovieConfig from "../../components/movies/forms/MovieConfig";
import useFetch from "../../hooks/useFetch";

const NewMovie = (props) => {
  const { fetch, isFetching, errorMsg } = useFetch();

  const addMovieHandler = async (movie) => {
    console.log("POST", movie);
    const res = await fetch.post(`${BACKEND_URL}/movies`, movie);
    return res;
  };

  return (
    <Container>
      <Content styles={{ maxWidth: "50em" }}>
        <h2>Neuen Film hinzufügen</h2>
        <MovieConfig
          onSubmit={addMovieHandler}
          isLoading={isFetching}
          error={errorMsg}
          isNew={true}
        />
      </Content>
    </Container>
  );
};

export default NewMovie;
