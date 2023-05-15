import { AnimatePresence, motion } from "framer-motion";
import styles from "./HorizontalScrollContainer.module.css";

const HorizontalScrollContainer = (props) => {
  return (
    <motion.div className={styles.scrollContainer}>
      <AnimatePresence>{props.children}</AnimatePresence>
    </motion.div>
  );
};

export default HorizontalScrollContainer;
