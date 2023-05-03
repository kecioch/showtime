import styles from "./Seat.module.css";

const Seat = (props) => {
  const data = props.data;
  const type = !data.type ? "empty" : "standard";
  let status = type;
  if (type === "empty" && !props.editMode) status = "blank";
  if (data.status !== "unselected") status = data.status;
  const classes = `${styles.seat} ${styles[status]}`;
  const bgColor = data?.type?.colorHEX && data.status !== "booked" ? data.type.colorHEX : "";

  const onMouseEnterHandler = (ev) => {
    if (ev.buttons !== 0) props.onSeatClick(data);
  };

  return (
    <div
      className={classes}
      onMouseEnter={onMouseEnterHandler}
      onClick={() => props.onSeatClick(data)}
      style={{ backgroundColor: bgColor }}
    ></div>
  );
};

export default Seat;
