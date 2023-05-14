import Button  from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "./SeatTypeListItem.module.css";
import { PencilSquare, Trash3Fill } from "react-bootstrap-icons";

const SeatTypeListItem = (props) => {
  const { data } = props;

  return (
    <Card className={styles.card}>
      <Card.Header className={styles.header}>{data.title}</Card.Header>
      <Card.Body style={{backgroundColor: data.colorHEX}}>{data.price}€</Card.Body>
      <Card.Footer className="d-flex justify-content-center gap-2">
        <Button variant="danger" onClick={() => props.onDelete(data)}><Trash3Fill /></Button>
        <Button variant="secondary" onClick={() => props.onEdit(data)}><PencilSquare /></Button>
      </Card.Footer>
    </Card>
  );
};

export default SeatTypeListItem;
