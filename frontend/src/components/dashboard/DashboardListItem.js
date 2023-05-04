import { useNavigate } from "react-router-dom";
import styles from "./DashboardListItem.module.css";

const DashboardListItem = (props) => {
  const navigate = useNavigate();
  const clickHandler = () => {
    if (props.linkTo) navigate(props.linkTo);
  };

  return (
    <div className={styles.listItem} onClick={clickHandler}>
      <h3>{props.children}</h3>
    </div>
  );
};

export default DashboardListItem;
