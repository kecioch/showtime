import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Container from "../components/ui/Container";
import Content from "../components/ui/Content";
import Image from "react-bootstrap/Image";
import styles from "./Movie.module.css";
import { BACKEND_URL } from "../constants";
import HorizontalScrollContainer from "../components/ui/HorizontalScrollContainer";
import CastAvatar from "../components/movies/CastAvatar";
import Badge from "react-bootstrap/Badge";
import Screeningplan from "../components/screeningplan/Screeningplan";
import useFetch from "../hooks/useFetch";

const Movie = (props) => {
  const { id } = useParams();
  const [movie, setMovie] = useState();
  const [screenings, setScreenings] = useState([]);
  const navigate = useNavigate();
  const { fetch } = useFetch();

  useEffect(() => {
    const fetchData = async () => {
      const movieRs = await fetch.get(`${BACKEND_URL}/movies/${id}`);
      console.log(movieRs);
      if (movieRs.status !== 200) navigate("/");
      setMovie(movieRs.data);

      const screeningsRs = await fetch.get(
        `${BACKEND_URL}/screenings?title=${id}`
      );
      console.log("SCREENINGS", screeningsRs);
      if (screeningsRs.status === 200) {
        setScreenings(
          screeningsRs.data.map((screening) => ({
            date: screening.date,
            weekday: screening.scheduledScreening.weekday,
            cinema: screening.scheduledScreening.cinema,
            time: screening.scheduledScreening.time,
            _id: screening._id,
          }))
        );
      }
    };
    fetchData();
  }, [id]);

  const castElements = movie?.credits?.cast?.map((el, i) => (
    <CastAvatar key={i} person={el} />
  ));

  const keywordElements = movie?.keywords?.map((el, i) => (
    <Badge key={i} bg="secondary">
      {el}
    </Badge>
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
              <h4 className="mt-3">Tickets</h4>
              {screenings?.length > 0 ? (
                <Screeningplan screenings={screenings} />
              ) : (
                <h3 className="text-muted text-center mt-4">
                  Keine Vorführungen im Programmplan vorhanden
                </h3>
              )}
            </div>
            <div className={styles.sideInformation}>
              <h4>Informationen</h4>
              <p>
                <b>Originaltitel:</b> {movie.originalTitle}
              </p>
              {movie.keywords?.length > 0 && (
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
