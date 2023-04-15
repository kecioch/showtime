import Container from "../../components/ui/Container";
import Content from "../../components/ui/Content";
import { BACKEND_URL } from "../../constants";
import MovieConfig from "../../components/movies/forms/MovieConfig";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const EditMovie = (props) => {
  const { id } = useParams();
  const [movie, setMovie] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      console.log(BACKEND_URL);
      try {
        const res = await fetch(`${BACKEND_URL}/movies/${id}`);
        const data = await res.json();
        console.log(data);
        if (data.code === 404) navigate("/movies");
        else setMovie(data);
      } catch (err) {
        console.log("ERROR", err);
      }
    };
    fetchMovie();
  }, []);

  const updateMovieHandler = async (updatedMovie) => {
    console.log("PUT", updatedMovie);
    fetch(`${BACKEND_URL}/movies/${movie.title}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMovie),
    }).then((res) => console.log(res));
  };

  return (
    <Container>
      <Content styles={{ maxWidth: "50em" }}>
        <h2>Film Bearbeiten</h2>
        <MovieConfig
          onSubmit={updateMovieHandler}
          default={movie}
          isNew={false}
        />
      </Content>
    </Container>
  );
};

export default EditMovie;
