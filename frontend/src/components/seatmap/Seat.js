import styles from "./Seat.module.css";

const Seat = (props) => {
  const data = props.data;

  const status = data.type === "empty" && !props.editMode ? "blank" : data.type;
  const classes = `${styles.seat} ${styles[status]}`;

  const onMouseEnterHandler = (ev) => {
    if (ev.buttons !== 0) props.onSeatClick(data);
  };

  return (
    <div
      className={classes}
      onMouseEnter={onMouseEnterHandler}
      onClick={() => props.onSeatClick(data)}
    ></div>
  );
};

export default Seat;