import Card from "react-bootstrap/Card";
import styles from "./CastAvatar.module.css";
import { X } from "react-bootstrap-icons";
import { motion } from "framer-motion";

const CastAvatar = (props) => {
  const person = props.person;
  const deleteable = props.isDeleteable;

  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
    >
      <Card className={styles.card}>
        {deleteable && (
          <X
            className={styles.deleteIcon}
            size={20}
            onClick={() => props.onDelete(person)}
          ></X>
        )}
        <Card.Img variant="top" src={person.img} />
        <Card.Header className={styles.name}>{person.name}</Card.Header>
        <Card.Body className={styles.roleName}>
          <Card.Text>{person.roleName}</Card.Text>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default CastAvatar;
