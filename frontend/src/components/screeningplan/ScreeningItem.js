import { Link } from "react-router-dom";
import styles from "./ScreeningItem.module.css";
import { TrashFill,TicketPerforated } from "react-bootstrap-icons";

const ScreeningItem = (props) => {
  const editMode = props.editMode;

  const onDelete = () => {
    props.onDelete(props.id);
  };

  return (
    <div className={styles.item}>
      {editMode && <p className={styles.title}>{props.title}</p>}
      <p className={styles.time}>
        {editMode ? (
          props.time
        ) : (
          <Link to={`/ticketshop/${props.id}`}><TicketPerforated /> {props.time}</Link>
        )}
      </p>
      {editMode && (
        <p>
          <TrashFill onClick={onDelete} />
        </p>
      )}
    </div>
  );
};

export default ScreeningItem;
