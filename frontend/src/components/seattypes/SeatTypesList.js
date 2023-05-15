import SeatTypeListItem from "./SeatTypeListItem";
import styles from "./SeatTypesList.module.css";
import { motion, AnimatePresence } from "framer-motion";

const SeatTypesList = (props) => {
  const { data } = props;
  const listItems = data?.map((type, i) => (
    <SeatTypeListItem
      data={type}
      key={i}
      onDelete={props.onDelete}
      onEdit={props.onEdit}
    />
  ));

  return (
    <motion.div className={styles.list}>
      <AnimatePresence>{listItems}</AnimatePresence>
    </motion.div>
  );
};

export default SeatTypesList;
