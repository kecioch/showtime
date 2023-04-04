import Container from "react-bootstrap/esm/Container";
import Content from "../../ui/Content";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../constants";
import EditList from "../../components/lists/EditList";

const Movies = (props) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/movies`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const movieItems = data.map((el) => ({
          title: el.title,
          editPath: `/movies/${el.title}`,
        }));
        setMovies(movieItems);
      })
      .catch((err) => console.log(err));
  }, []);

  const onDeleteMovie = (movie) => {};

  return (
    <Container>
      <Content>
        <h1>Filme Verwalten</h1>
        <hr />
        <Link to="/movies/new">
          <Button className="mb-4" variant="primary">
            Neu
          </Button>
        </Link>
        {movies.length > 0 && (
          <EditList data={movies} onDelete={onDeleteMovie} />
        )}
        {movies.length <= 0 && (
          <h2 className="text-muted text-center">Keine Filme vorhanden</h2>
        )}
      </Content>
    </Container>
  );
};

export default Movies;
