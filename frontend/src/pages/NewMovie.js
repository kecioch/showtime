import Card from "react-bootstrap/Card";
import Container from "../ui/Container";
import ContentCard from "../ui/Content";
import ListGroup from "react-bootstrap/ListGroup";
import styles from "./NewMovie.module.css";
import { BACKEND_URL } from "../constants";
import MovieForm from "../components/movies/forms/MovieForm";
import MovieConfig from "../components/movies/forms/MovieConfig";

const NewMovie = (props) => {
  const addMovieHandler = async (movie) => {
    let msg;
    const res = await fetch(`${BACKEND_URL}/movies`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    });
    return {code: res.status};
  };

  return (
    <Container>
      <ContentCard>
        <h2>Neuen Film hinzufügen</h2>
        <MovieConfig onSubmit={addMovieHandler} isNew={true} />
      </ContentCard>
    </Container>
  );
};

export default NewMovie;
