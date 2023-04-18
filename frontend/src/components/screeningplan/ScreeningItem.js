import { Link } from "react-router-dom";
import styles from "./ScreeningItem.module.css";
import { TrashFill } from "react-bootstrap-icons";
import { BACKEND_URL } from "../../constants";

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
          <Link to={`${BACKEND_URL}/ticketshop/${props.id}`}>{props.time}</Link>
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
