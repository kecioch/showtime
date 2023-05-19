import Container from "../../components/ui/Container";
import Content from "../../components/ui/Content";
import { BACKEND_URL } from "../../constants";
import MovieConfig from "../../components/movies/forms/MovieConfig";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import styles from "./EditMovie.module.css";
import useFlash from "../../hooks/useFlash";

const EditMovie = (props) => {
  const { id } = useParams();
  const [movie, setMovie] = useState();
  const navigate = useNavigate();
  const { fetch, isFetching, errorMsg } = useFetch();
  const { fetch: fetchPage, isFetching: isFetchingPage } = useFetch();
  const { createMessage } = useFlash();

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetchPage.get(`${BACKEND_URL}/movies/${id}`);
      if (res.status !== 200) navigate("/movies");
      else setMovie(res.data);
    };
    fetchMovie();
  }, []);

  const updateMovieHandler = async (updatedMovie) => {
    const res = await fetch.put(
      `${BACKEND_URL}/movies/${movie._id}`,
      updatedMovie
    );
    if (res.status === 200) {
      setMovie(res.data);
      document.body.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      createMessage({
        text: "Film wurde erfolgreich aktualisiert",
        variant: "success",
      });
    }
    return res;
  };

  return (
    <Container>
      <Content className={styles.content}>
        <h2>Film Bearbeiten</h2>
        {isFetchingPage && <LoadingSpinner />}
        {!isFetchingPage && (
          <MovieConfig
            onSubmit={updateMovieHandler}
            default={movie}
            isNew={false}
            isLoading={isFetching}
            error={errorMsg}
          />
        )}
      </Content>
    </Container>
  );
};

export default EditMovie;
