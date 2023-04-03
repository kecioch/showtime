import styles from "./SeatMap.module.css";
import SeatRow from "./SeatRow";

const SeatMap = (props) => {
  const rows = props.data.map((el, i) => (
    <SeatRow
      key={i}
      data={el}
      editMode={props.editMode}
      onSeatClick={props.onSeatClick}
    />
  ));

  return (
    <div className={styles.seatMap}>
      <div className={styles.screen} />
      {rows}
    </div>
  );
};

export default SeatMap;
