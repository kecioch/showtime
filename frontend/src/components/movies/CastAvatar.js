import Card from "react-bootstrap/Card";
import styles from "./CastAvatar.module.css";
import { X } from "react-bootstrap-icons";

const CastAvatar = (props) => {
  const person = props.person;
  const deleteable = props.isDeleteable;

  return (
    <Card className={styles.card}>
      {deleteable && <X className={styles.deleteIcon} size={20} onClick={() => props.onDelete(person)}></X>}
      <Card.Img variant="top" src={person.img} />
      <Card.Header className={styles.name}>{person.name}</Card.Header>
      <Card.Body className={styles.roleName}>
        <Card.Text>{person.roleName}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CastAvatar;
