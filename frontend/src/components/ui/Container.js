import styles from "./Container.module.css";

const Container = (props) => {
  const styleClasses = `${styles.container} ${props.className}`;
  return <div className={styleClasses} style={props.style}>{props.children}</div>;
};

export default Container;
