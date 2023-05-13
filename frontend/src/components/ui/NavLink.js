import { Link } from "react-router-dom";
import styles from "./NavLink.module.css";

const NavLink = ({ children, to, onClick, className }) => {
  const classes = `${styles.link} ${className}`;
  return (
    <Link to={to} className={classes} onClick={onClick}>
      <span>{children}</span>
      <span className={styles.slider}></span>
    </Link>
  );
};

export default NavLink;
