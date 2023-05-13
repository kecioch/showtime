import styles from "./FadeLine.module.css";

const FadeLine = ({ className }) => {
  const classes = `${styles.fadeLine} ${className}`;
  return <div className={classes}></div>;
};

export default FadeLine;
