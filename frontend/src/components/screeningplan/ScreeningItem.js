import Button from "react-bootstrap/esm/Button";
import styles from "./ScreeningItem.module.css";
import { TrashFill } from "react-bootstrap-icons";

const ScreeningItem = (props) => {
  const onDelete = () => {
    props.onDelete(props.id);
  };

  return (
    <div className={styles.item}>
      <p className={styles.title}>{props.title}</p>
      <p className={styles.time}>{props.time}</p>
      <p>
        <TrashFill onClick={onDelete} />
      </p>
    </div>
  );
};

export default ScreeningItem;
