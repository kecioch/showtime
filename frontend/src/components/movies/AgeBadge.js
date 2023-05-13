import { Badge } from "react-bootstrap";
import styles from "./AgeBadge.module.css";

const AgeBadge = ({ children, className }) => {
  let ageColor;

  if (children >= 18) ageColor = "adult";
  else if (children >= 16) ageColor = "teen";
  else if (children >= 12) ageColor = "child";
  else ageColor = "free";

  const classes = `${styles.badge} ${styles[ageColor]} ${className}`;

  return <span className={classes}>{children}</span>;
};

export default AgeBadge;
