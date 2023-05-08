import Container from "../../components/ui/Container";
import Content from "../../components/ui/Content";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../constants";
import EditList from "../../components/lists/EditList";
import DeleteModal from "../../components/modals/DeleteModal";
import useFetch from "../../hooks/useFetch";

const Movies = (props) => {
  const [movies, setMovies] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteMovie, setDeleteMovie] = useState();
  const { fetch, isFetching, errorMsg, clearErrorMsg } = useFetch();

  useEffect(() => {
    fetch.get(`${BACKEND_URL}/movies`).then((res) => {
      console.log(res);
      if (res.status !== 200) return;
      const movieItems = res.data.map((el) => ({
        title: el.title,
        editPath: `/admin/movies/${el.title}/edit`,
      }));
      setMovies(
        movieItems.sort((movieA, movieB) =>
          movieA.title.localeCompare(movieB.title)
        )
      );
    });
  }, []);

  const onDeleteMovie = (movie) => {
    setDeleteMovie(movie);
    clearErrorMsg();
    setShowDeleteModal(true);
  };

  const deleteMovieHandler = () => {
    console.log("DELETE", deleteMovie);
    fetch.delete(`${BACKEND_URL}/movies/${deleteMovie.title}`).then((res) => {
      console.log(res);
      if (res.status !== 200) return;
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
          <Link to="/admin/movies/new">
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
        isLoading={isFetching}
        error={errorMsg}
      />
    </>
  );
};

export default Movies;
