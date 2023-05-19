import Container from "../../components/ui/Container";
import Content from "../../components/ui/Content";
import { BACKEND_URL } from "../../constants";
import MovieConfig from "../../components/movies/forms/MovieConfig";
import useFetch from "../../hooks/useFetch";
import styles from "./NewMovie.module.css";
import useFlash from "../../hooks/useFlash";

const NewMovie = (props) => {
  const { fetch, isFetching, errorMsg } = useFetch();
  const { createMessage } = useFlash();

  const addMovieHandler = async (movie) => {
    const res = await fetch.post(`${BACKEND_URL}/movies`, movie);
    if (res.status === 200) {
      document.body.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      createMessage({
        text: "Film wurde erfolgreich erstellt",
        variant: "success",
      });
    }
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
