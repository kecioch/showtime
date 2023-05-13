import styles from "./Content.module.css";

const Content = ({ children, style, className }) => {
  const classes = `${styles.content} ${className}`;
  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
};

export default Content;
