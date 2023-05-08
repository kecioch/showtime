import Button from "react-bootstrap/esm/Button";
import styles from "./EditListItem.module.css";
import { Link } from "react-router-dom";

const EditListItem = (props) => {
  const item = props.data;

  return (
    <div className={styles.listItem}>
      <h3>{item.title}</h3>
      <div className="d-flex flex-row gap-2">
        <Link to={item.editPath}>
          <Button variant="primary" style={{height: "100%"}}>Bearbeiten</Button>
        </Link>
        <Button variant="danger" onClick={() => props.onDelete(item)}>
          Löschen
        </Button>
      </div>
    </div>
  );
};

export default EditListItem;
