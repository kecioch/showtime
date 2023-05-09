import { Placeholder, Spinner } from "react-bootstrap";
import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <div className={styles.background}>
      <Spinner className={styles.spinner} />
    </div>
  );
};

export default LoadingSpinner;
