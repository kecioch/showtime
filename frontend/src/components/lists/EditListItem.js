import Button from "react-bootstrap/esm/Button";
import styles from "./EditListItem.module.css";
import { Link } from "react-router-dom";
import { PencilSquare, Trash3Fill } from "react-bootstrap-icons";

const EditListItem = (props) => {
  const item = props.data;

  return (
    <div className={styles.listItem}>
      <h3>{item.title}</h3>
      <div className="d-flex flex-row gap-2">
        <Link to={item.editPath}>
          <Button variant="secondary" style={{ height: "100%" }}>
            <PencilSquare />
          </Button>
        </Link>
        <Button variant="danger" onClick={() => props.onDelete(item)}>
          <Trash3Fill />
        </Button>
      </div>
    </div>
  );
};

export default EditListItem;
