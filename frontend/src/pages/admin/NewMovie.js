import Container from "../../components/ui/Container";
import Content from "../../components/ui/Content";
import styles from "./NewMovie.module.css";
import { BACKEND_URL } from "../../constants";
import MovieConfig from "../../components/movies/forms/MovieConfig";

const NewMovie = (props) => {
  const addMovieHandler = async (movie) => {
    console.log("POST", movie);
    const res = await fetch(`${BACKEND_URL}/movies`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    });
    return { code: res.status };
  };

  return (
    <Container>
      <Content styles={{ maxWidth: "50em" }}>
        <h2>Neuen Film hinzufügen</h2>
        <MovieConfig onSubmit={addMovieHandler} isNew={true} />
      </Content>
    </Container>
  );
};

export default NewMovie;
