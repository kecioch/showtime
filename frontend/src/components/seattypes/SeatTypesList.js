import SeatTypeListItem from "./SeatTypeListItem";
import styles from "./SeatTypesList.module.css";

const SeatTypesList = (props) => {
  const { data } = props;
  const listItems = data?.map((type, i) => (
    <SeatTypeListItem
      data={type}
      key={i}
      onDelete={props.onDelete}
      onEdit={props.onEdit}
    />
  ));

  return <div className={styles.list}>{listItems}</div>;
};

export default SeatTypesList;
