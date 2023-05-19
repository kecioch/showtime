import styles from "./LoadingLine.module.css";

const LoadingLine = ({ timer }) => {
  return (
    <div className={styles.container}>
      <div
        className={styles.line}
        style={{ animationDuration: timer || "5s" }}
      ></div>
    </div>
  );
};

export default LoadingLine;
