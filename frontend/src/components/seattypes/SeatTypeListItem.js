import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "./SeatTypeListItem.module.css";
import { PencilSquare, Trash3Fill } from "react-bootstrap-icons";
import { motion } from "framer-motion";

const SeatTypeListItem = (props) => {
  const { data } = props;

  return (
    <motion.div
      layout
      animate={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: -10 }}
      exit={{ opacity: 0 }}
    >
      <Card className={styles.card}>
        <Card.Header className={styles.header}>{data.title}</Card.Header>
        <Card.Body style={{ backgroundColor: data.colorHEX }}>
          {data.price}€
        </Card.Body>
        <Card.Footer className="d-flex justify-content-center gap-2">
          <Button variant="danger" onClick={() => props.onDelete(data)}>
            <Trash3Fill />
          </Button>
          <Button variant="secondary" onClick={() => props.onEdit(data)}>
            <PencilSquare />
          </Button>
        </Card.Footer>
      </Card>
    </motion.div>
  );
};

export default SeatTypeListItem;
