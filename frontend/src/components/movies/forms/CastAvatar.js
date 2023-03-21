import Card from "react-bootstrap/Card";
import styles from "./CastAvatar.module.css";

const CastAvatar = (props) => {
  const person = props.person;

  return (
    <Card className={styles.card}>
      <Card.Img variant="top" src={person.img} />
      <Card.Header className={styles.name}>{person.name}</Card.Header>
      <Card.Body className={styles.roleName}>
        <Card.Text>{person.roleName}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CastAvatar;
