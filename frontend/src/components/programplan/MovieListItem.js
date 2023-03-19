import styles from "./MovieListItem.module.css";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const MovieListItem = (props) => {
  const { movie } = props;

  return (
    <Card style={{ width: "100%" }}>
      <Card.Body className={styles.movieListItem}>
        <div className={styles.cover}>
          <Image
            src={movie.poster}
            fluid={true}
          />
        </div>
        <div className={styles.information}>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {movie.subtitle}
          </Card.Subtitle>
          <Card.Text>{movie.description}</Card.Text>
          <Link to={`/movies/${movie.title}`}>
            <Button>Details</Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MovieListItem;
