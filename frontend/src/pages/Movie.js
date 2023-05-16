import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "../components/ui/Container";
import Content from "../components/ui/Content";
import styles from "./Movie.module.css";
import { BACKEND_URL } from "../constants";
import HorizontalScrollContainer from "../components/ui/HorizontalScrollContainer";
import CastAvatar from "../components/movies/CastAvatar";
import Badge from "react-bootstrap/Badge";
import Screeningplan from "../components/screeningplan/Screeningplan";
import useFetch from "../hooks/useFetch";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import AgeBadge from "../components/movies/AgeBadge";
import FadeLine from "../components/ui/FadeLine";
import PosterWeekCnt from "../components/movies/PosterWeekCnt";
import { motion } from "framer-motion";

const Movie = (props) => {
  const { id } = useParams();
  const [movie, setMovie] = useState();
  const [screenings, setScreenings] = useState([]);
  const navigate = useNavigate();
  const { fetch, isFetching } = useFetch();

  useEffect(() => {
    const fetchData = async () => {
      const movieRs = await fetch.get(`${BACKEND_URL}/movies/${id}`);
      if (movieRs.status !== 200) navigate("/");
      setMovie(movieRs.data);

      const screeningsRs = await fetch.get(
        `${BACKEND_URL}/screenings?title=${id}`
      );
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
    <motion.div
      key={i}
      layout
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.8 }}
    >
      <Badge bg="secondary" className={styles.badge}>
        {el}
      </Badge>
    </motion.div>
  ));

  const trailer = movie?.media?.videos?.trailer;

  return (
    <Container>
      <Content className={styles.content}>
        {isFetching && <LoadingSpinner className="mt-4" />}
        {!isFetching && movie && (
          <>
            <section className={styles.headerInfo}>
              <PosterWeekCnt
                src={movie.media.images.poster}
                startdate={new Date(movie.startdate)}
                className={styles.poster}
              />
              <h1>{movie.title}</h1>
              <p className={styles.metaInfo}>
                <AgeBadge>{movie.release.ageRestriction}</AgeBadge> •{" "}
                {movie.release.productionYear} (
                {movie.release.productionCountry}) • {movie.genres.join(", ")} •{" "}
                {movie.runtime}min
              </p>
              {movie.subtitle && (
                <h3 className="text-muted">{movie.subtitle}</h3>
              )}
              <p className={styles.description}>{movie.description}</p>
              <div className="mt-5 d-flex gap-5">
                <div>
                  <h4 className="mb-1">Regie</h4>
                  <p>{movie.credits.crew.director.name}</p>
                </div>
                <div>
                  <h4 className="mb-1">Drehbuch</h4>
                  <p>{movie.credits.crew.screenwriter.name}</p>
                </div>
              </div>
              <hr style={{ clear: "both", border: "none" }} />
            </section>
            <FadeLine className="mt-3" />
            <section className={styles.details}>
              <div className={styles.mainInformation}>
                <h3 className="mb-3">Tickets</h3>
                {screenings?.length > 0 ? (
                  <div className={styles.tickets}>
                    <Screeningplan screenings={screenings} />
                  </div>
                ) : (
                  <h3 className="text-muted text-center mt-4">
                    Keine Vorführungen im Programmplan vorhanden
                  </h3>
                )}

                {trailer?.key && trailer?.site === "YouTube" && (
                  <>
                    <h3 className="mt-4 mb-3">Trailer</h3>
                    <div className={styles.trailer}>
                      <iframe
                        src={`https://www.youtube.com/embed/${trailer.key}`}
                        title="Trailer"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                      ></iframe>
                    </div>
                  </>
                )}

                <h3 className="mt-4 mb-3">Cast</h3>
                <HorizontalScrollContainer>
                  {castElements}
                </HorizontalScrollContainer>
              </div>
              <div className={styles.sideInformation}>
                <h3>Informationen</h3>
                <p>
                  <b>Originaltitel:</b> {movie.originalTitle}
                </p>
                {movie.keywords?.length > 0 && (
                  <section>
                    <h3>Schlüsselwörter</h3>
                    <div className="d-flex gap-1 flex-wrap">
                      {keywordElements}
                    </div>
                  </section>
                )}
              </div>
            </section>
          </>
        )}
      </Content>
    </Container>
  );
};

export default Movie;
