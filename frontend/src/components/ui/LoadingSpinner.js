import {  Spinner } from "react-bootstrap";
import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = ({className}) => {
  const classes = `${styles.background} ${className}`;
  return (
    <div className={classes}>
      <Spinner className={styles.spinner} />
    </div>
  );
};

export default LoadingSpinner;
