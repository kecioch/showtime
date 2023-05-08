import styles from "./ListGroupStyled.module.css";
import { ListGroup } from "react-bootstrap";

const ListGroupStyled = ({ children, className }) => {
  const classes = `${styles.listGroup} ${className}`;
  return <ListGroup className={classes}>{children}</ListGroup>;
};

export default ListGroupStyled;
