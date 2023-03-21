import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Container from "../ui/Container";
import Content from "../ui/Content";
import Image from "react-bootstrap/Image";
import styles from "./Movie.module.css";
import { BACKEND_URL } from "../constants";
import HorizontalScrollContainer from "../ui/HorizontalScrollContainer";
import CastAvatar from "../components/movies/forms/CastAvatar";
import Badge from "react-bootstrap/Badge";

const Movie = (props) => {
  const { id } = useParams();
  const [movie, setMovie] = useState();

  useEffect(() => {
    console.log(BACKEND_URL);
    fetch(`${BACKEND_URL}/movies/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovie(data);
      });
  }, []);

  const castElements = movie?.credits?.cast?.map((el, i) => (
    <CastAvatar key={i} person={el} />
  ));
  const keywordElements = movie?.keywords?.map((el, i) => (
    <Badge key={i} bg="secondary">
      {el}
    </Badge>
  ));

  const genreElements = movie?.genres?.map((el, i) => (
    <span key={i}>{el}</span>
  ));

  return (
    <Container>
      {movie && (
        <Content>
          <section>
            <div className={styles.headerInfo}>
              <Image
                src={movie.media.images.poster}
                className={styles.poster}
              />

              <div>
                <h1>{movie.title}</h1>
                <p>
                  <Badge>{movie.release.ageRestriction}</Badge> •{" "}
                  {movie.release.productionYear} (
                  {movie.release.productionCountry}) • {movie.genres.join(", ")}{" "}
                  • {movie.runtime}min
                </p>
                {movie.subtitle && (
                  <h3 className="text-muted">{movie.subtitle}</h3>
                )}
                <p className={styles.description}>{movie.description}</p>
                <div className="d-flex gap-5">
                  <div>
                    <h4 className="mb-1">Regie</h4>
                    <p>{movie.credits.crew.director.name}</p>
                  </div>
                  <div>
                    <h4 className="mb-1">Drehbuch</h4>
                    <p>{movie.credits.crew.screenwriter.name}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className={styles.details}>
            <div className={styles.cast}>
              <h4>Cast</h4>
              <HorizontalScrollContainer>
                {castElements}
              </HorizontalScrollContainer>
            </div>
            <div className={styles.sideInformation}>
              <h4>Informationen</h4>
              <p>
                <b>Originaltitel:</b> {movie.originalTitle}
              </p>
              {movie.keywords && (
                <section>
                  <h4>Schlüsselwörter</h4>
                  <div className="d-flex gap-1 flex-wrap">
                    {keywordElements}
                  </div>
                </section>
              )}
            </div>
          </section>
        </Content>
      )}
    </Container>
  );
};

export default Movie;
