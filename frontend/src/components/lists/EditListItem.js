import Button from "react-bootstrap/esm/Button";
import styles from "./EditListItem.module.css";
import { Link } from "react-router-dom";
import { PencilSquare, Trash3Fill } from "react-bootstrap-icons";
import { motion } from "framer-motion";

const EditListItem = (props) => {
  const item = props.data;

  return (
    <motion.div
      layout
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: -10 }}
      exit={{ opacity: 0 }}
      className={styles.listItem}
    >
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
    </motion.div>
  );
};

export default EditListItem;
