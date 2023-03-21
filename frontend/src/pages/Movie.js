import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Container from "../ui/Container";
import Content from "../ui/Content";
import Image from "react-bootstrap/Image";
import styles from "./Movie.module.css";
import {BACKEND_URL} from "../constants";

const Movie = (props) => {
  const { id } = useParams();
  const [movie, setMovie] = useState();

  useEffect(() => {
    console.log(BACKEND_URL)
    fetch(`${BACKEND_URL}/movies/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovie(data);
      });
  }, []);

  return (
    <Container>
      {movie && (
        <Content>
          <div className={styles.headerInfo}>
            <Image src={movie.media.images.poster}  className={styles.poster} />

            <div>
              <h1>{movie.title}</h1>
              <h3 className="text-muted">{movie.subtitle}</h3>
              <p className={styles.description}>{movie.description}</p>
            </div>
          </div>
        </Content>
      )}
    </Container>
  );
};

export default Movie;
