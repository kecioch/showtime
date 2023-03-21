import styles from "./HorizontalScrollContainer.module.css";

const HorizontalScrollContainer = props => {
    return (
        <div className={styles.scrollContainer}>
            {props.children}
        </div>
    );
};

export default HorizontalScrollContainer;