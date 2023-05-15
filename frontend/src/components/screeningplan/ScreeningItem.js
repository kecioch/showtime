import { Link } from "react-router-dom";
import styles from "./ScreeningItem.module.css";
import { TrashFill, TicketPerforated } from "react-bootstrap-icons";
import { motion } from "framer-motion";

const ScreeningItem = (props) => {
  const editMode = props.editMode;

  const onDelete = () => {
    props.onDelete(props.id);
  };

  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      className={styles.item}
    >
      {editMode && <p className={styles.title}>{props.title}</p>}
      <p className={styles.time}>
        {editMode ? (
          props.time
        ) : (
          <Link to={`/ticketshop/${props.id}`}>
            <TicketPerforated /> {props.time}
          </Link>
        )}
      </p>
      {editMode && (
        <p>
          <TrashFill onClick={onDelete} />
        </p>
      )}
    </motion.div>
  );
};

export default ScreeningItem;
