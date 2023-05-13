import styles from "./MovieListItem.module.css";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import MainButton from "../ui/MainButton";
import AgeBadge from "../movies/AgeBadge";
import { TicketDetailedFill } from "react-bootstrap-icons";
import TruncatedText from "../ui/TruncatedText";

const MovieListItem = (props) => {
  const { movie } = props;
  const classes = `${styles.card} ${props.className}`;

  return (
    <Card className={classes}>
      <Card.Body className={styles.movieListItem}>
        <Image src={movie.media.images.poster} className={styles.cover} />
        <Card.Title className={styles.title}>{movie.title}</Card.Title>
        <p>
          <AgeBadge>{movie.release.ageRestriction}</AgeBadge> •{" "}
          {movie.release.productionYear} ({movie.release.productionCountry}) •{" "}
          {movie.genres.join(", ")} • {movie.runtime}min
        </p>
        {movie.subtitle && (
          <Card.Subtitle className="mb-2 text-muted">
            {movie.subtitle}
          </Card.Subtitle>
        )}
        <TruncatedText className={styles.description} maxLength={400}>
          {movie.description}
        </TruncatedText>
        <Link to={`/movies/${movie.title}`} className={styles.link}>
          <MainButton>
            <TicketDetailedFill /> Tickets buchen
          </MainButton>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default MovieListItem;
