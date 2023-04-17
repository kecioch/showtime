import Container from "../../components/ui/Container";
import Content from "../../components/ui/Content";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../constants";
import EditList from "../../components/lists/EditList";
import DeleteModal from "../../components/modals/DeleteModal";

const Movies = (props) => {
  const [movies, setMovies] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteMovie, setDeleteMovie] = useState();

  useEffect(() => {
    fetch(`${BACKEND_URL}/movies`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const movieItems = data.map((el) => ({
          title: el.title,
          editPath: `/movies/${el.title}/edit`,
        }));
        setMovies(
          movieItems.sort((movieA, movieB) =>
            movieA.title.localeCompare(movieB.title)
          )
        );
      })
      .catch((err) => console.log(err));
  }, []);

  const onDeleteMovie = (movie) => {
    setDeleteMovie(movie);
    setShowDeleteModal(true);
  };

  const deleteMovieHandler = () => {
    console.log("DELETE", deleteMovie);
    fetch(`${BACKEND_URL}/movies/${deleteMovie.title}`, {
      method: "DELETE",
    }).then((res) => {
      console.log(res);
      setShowDeleteModal(false);
      setMovies((prev) => {
        const movies = prev.filter((el) => el.title !== deleteMovie.title);
        return movies;
      });
    });
  };

  return (
    <>
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
      <DeleteModal
        show={showDeleteModal}
        title={deleteMovie?.title}
        text="Wollen Sie wirklich den Film löschen?"
        onClose={() => setShowDeleteModal(false)}
        onDelete={deleteMovieHandler}
      />
    </>
  );
};

export default Movies;
