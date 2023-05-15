import EditListItem from "../lists/EditListItem";
import { AnimatePresence, motion } from "framer-motion";

const EditList = (props) => {
  const items = props.data;

  const listItems = items.map((el, i) => (
    <EditListItem key={i} data={el} onDelete={props.onDelete} />
  ));

  return (
    <motion.div layout className="d-flex flex-column gap-2">
      <AnimatePresence>{listItems}</AnimatePresence>
    </motion.div>
  );
};

export default EditList;
