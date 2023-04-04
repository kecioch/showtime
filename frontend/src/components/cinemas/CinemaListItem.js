import Button from "react-bootstrap/esm/Button";
import styles from "./CinemaListItem.module.css";
import { Link } from "react-router-dom";

const CinemaListItem = (props) => {
  const cinema = props.data;

  return (
    <div className={styles.listItem}>
      <h3>{cinema.title}</h3>
      <div className="d-flex gap-2">
        <Link to={`/cinemas/${cinema.title}`}>
          <Button variant="primary">Bearbeiten</Button>
        </Link>
        <Button variant="danger" onClick={() => props.onDelete(cinema)}>
          Löschen
        </Button>
      </div>
    </div>
  );
};

export default CinemaListItem;
