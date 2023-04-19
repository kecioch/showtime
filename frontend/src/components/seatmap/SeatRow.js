import styles from "./SeatRow.module.css";
import Seat from "./Seat";

const SeatRow = (props) => {
  const seats = props.data.map((el, i) => (
    <Seat
      key={i}
      data={el}
      editMode={props.editMode}
      onSeatClick={props.onSeatClick}
    />
  ));

  return <div className={styles.row}>{seats}</div>;
};

export default SeatRow;
