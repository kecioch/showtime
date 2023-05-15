import styles from "./Badge.module.css";

const Badge = (props) => {
  return (
      <span className={styles.badge} style={props.style}>
        {props.children}
      </span>
  );
};

export default Badge;
