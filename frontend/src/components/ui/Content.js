import { useEffect } from "react";
import Card from "react-bootstrap/Card";
import styles from "./Content.module.css";
import classNames from "classnames";

const Content = (props) => {
  return <div className={styles.content} style={props.styles}>{props.children}</div>;
};

export default Content;
