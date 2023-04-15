import styles from "./ScreeningItem.module.css";

const ScreeningItem = props => {
    return (
        <div className={styles.item}>
            {/* <span className={styles.close}>X</span> */}
            <p className={styles.title}>{props.title}</p>
            <p className={styles.time}>{props.time}</p>
        </div>
    );
};

export default ScreeningItem;