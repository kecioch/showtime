import Container from "../../components/ui/Container";
import Content from "../../components/ui/Content";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../constants";
import EditList from "../../components/lists/EditList";
import DeleteModal from "../../components/modals/DeleteModal";
import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import MainButton from "../../components/ui/MainButton";
import styles from "./Movies.module.css";
import useFlash from "../../hooks/useFlash";

const Movies = (props) => {
  const [movies, setMovies] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteMovie, setDeleteMovie] = useState();
  const { fetch, isFetching, errorMsg, clearErrorMsg } = useFetch();
  const { fetch: fetchPage, isFetching: isFetchingPage } = useFetch();
  const { createMessage } = useFlash();

  useEffect(() => {
    fetchPage.get(`${BACKEND_URL}/movies`).then((res) => {
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
    fetch.delete(`${BACKEND_URL}/movies/${deleteMovie.title}`).then((res) => {
      if (res.status !== 200) return;
      setShowDeleteModal(false);
      createMessage({
        text: "Film wurde erfolgreich gelöscht ",
        variant: "success",
      });
      setMovies((prev) => {
        const movies = prev.filter((el) => el.title !== deleteMovie.title);
        return movies;
      });
    });
  };

  return (
    <>
      <Container>
        <Content className={styles.content} style={{minHeight: "70vh"}}>
          <div className={styles.header}>
            <h1>Filme Verwalten</h1>
            <hr />
            <Link to="/admin/movies/new">
              <MainButton className="mb-4">Neu Film hinzufügen</MainButton>
            </Link>
          </div>
          {isFetchingPage && <LoadingSpinner />}
          {!isFetchingPage && (
            <>
              {movies.length > 0 && (
                <EditList data={movies} onDelete={onDeleteMovie} />
              )}
              {movies.length <= 0 && (
                <h2 className="text-muted text-center">
                  Keine Filme vorhanden
                </h2>
              )}
            </>
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
