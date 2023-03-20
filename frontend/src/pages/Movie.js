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
      <Link to="../">Back</Link>
      {movie && (
        <Content>
          <div className={styles.headerInfo}>
            <Image src={movie.poster} fluid={true}/>

            <div>
              <h1>{movie.title}</h1>
              <h2>{movie.subtitle}</h2>
              <p>{movie.description}</p>
            </div>
          </div>
        </Content>
      )}
    </Container>
  );
};

export default Movie;
