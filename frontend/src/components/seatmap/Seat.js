import { useEffect, useState } from "react";
import styles from "./Seat.module.css";

const Seat = (props) => {
  const data = props.data;
  // console.log("SEAT TYPE",data.type,!data.type)
  // const type = !data.type ? "empty" : data.type.title.toLowerCase();
  // const type = !data.type ? "empty" : "standard";

  // let status = type === "empty" && !props.editMode ? "blank" : type;

  const type = !data.type ? "empty" : "standard";
  let status = type;
  if (type === "empty" && !props.editMode) status = "blank";
  if (data.status !== "unselected") status = data.status;
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
