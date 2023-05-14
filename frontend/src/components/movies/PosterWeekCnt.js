import { getWeekCounter } from "../../services/FormatDate";
import { Image } from "react-bootstrap";
import styles from "./PosterWeekCnt.module.css";

const PosterWeekCnt = ({ src, startdate, className }) => {
  const classes = `${styles.container} ${className}`;

  return (
    <div className={classes}>
      <Image src={src} className={styles.cover} />
      <p className={styles.weeks}>{getWeekCounter(startdate)}. Woche</p>
    </div>
  );
};

export default PosterWeekCnt;
