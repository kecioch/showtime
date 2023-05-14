import Container from "../../components/ui/Container";
import Content from "../../components/ui/Content";
import { BACKEND_URL } from "../../constants";
import MovieConfig from "../../components/movies/forms/MovieConfig";
import useFetch from "../../hooks/useFetch";
import styles from "./NewMovie.module.css";

const NewMovie = (props) => {
  const { fetch, isFetching, errorMsg } = useFetch();

  const addMovieHandler = async (movie) => {
    console.log("POST", movie);
    const res = await fetch.post(`${BACKEND_URL}/movies`, movie);
    return res;
  };

  return (
    <Container>
      <Content className={styles.content}>
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
