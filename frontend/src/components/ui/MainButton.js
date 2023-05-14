import styles from "./MainButton.module.css";
import { Button } from "react-bootstrap";

const MainButton = ({ className, onClick, children, disabled }) => {
  const classes = `${styles.button} ${className}`;
  return (
    <Button className={classes} onClick={onClick} disabled={disabled}>
      <span className={styles.children}>{children}</span>
    </Button>
  );
};

export default MainButton;
