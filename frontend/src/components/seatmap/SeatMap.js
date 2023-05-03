import styles from "./SeatMap.module.css";
import SeatRow from "./SeatRow";
import Badge from "../ui/Badge";

const SeatMap = (props) => {
  const rows = props.data?.map?.rows?.map((el, i) => (
    <SeatRow
      key={i}
      data={el}
      editMode={props.editMode}
      onSeatClick={props.onSeatClick}
    />
  ));

  const types = [
    ...new Set(
      props.data?.map?.rows?.flatMap((row) =>
        row.filter((seat) => seat.type !== null).map((seat) => seat.type)
      )
    ),
  ].filter((type) => !!type);
  console.log("TYPES!", types);
  const legend = !props.editMode && types.map((type, i) => <Badge key={i} style={{backgroundColor: type.colorHEX}}>{type.title}</Badge>);

  return (
    <div className={styles.seatMap}>
      <div className={styles.screen} />
      {rows}
      {!props.editMode && <div className={styles.legend}>{legend}</div>}
    </div>
  );
};

export default SeatMap;
