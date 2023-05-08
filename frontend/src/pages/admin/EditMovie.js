import Container from "../../components/ui/Container";
import Content from "../../components/ui/Content";
import { BACKEND_URL } from "../../constants";
import MovieConfig from "../../components/movies/forms/MovieConfig";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

const EditMovie = (props) => {
  const { id } = useParams();
  const [movie, setMovie] = useState();
  const navigate = useNavigate();
  const { fetch, isFetching, errorMsg } = useFetch();

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch.get(`${BACKEND_URL}/movies/${id}`);
      console.log(res);
      if (res.status !== 200) navigate("/movies");
      else setMovie(res.data);
    };
    fetchMovie();
  }, []);

  const updateMovieHandler = async (updatedMovie) => {
    console.log("PUT", updatedMovie);
    const res = await fetch.put(
      `${BACKEND_URL}/movies/${movie._id}`,
      updatedMovie
    );
    if (res.status === 200) {
      setMovie(res.data);
    }
    return res;
  };

  return (
    <Container>
      <Content styles={{ maxWidth: "50em" }}>
        <h2>Film Bearbeiten</h2>
        <MovieConfig
          onSubmit={updateMovieHandler}
          default={movie}
          isNew={false}
          isLoading={isFetching}
          error={errorMsg}
        />
      </Content>
    </Container>
  );
};

export default EditMovie;
