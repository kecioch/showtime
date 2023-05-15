import Badge from "react-bootstrap/Badge";
import { X } from "react-bootstrap-icons";
import { motion } from "framer-motion";

const BadgeAction = (props) => {
  const deleteable = props.isDeleteable;
  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
    >
      <Badge bg={props.bg}>
        {props.children}
        {deleteable && (
          <span onClick={() => props.onDelete(props.id)}>
            <X size={15}></X>
          </span>
        )}
      </Badge>
    </motion.div>
  );
};

export default BadgeAction;
