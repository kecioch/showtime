import styles from "./TicketListItem.module.css";
import Image from "react-bootstrap/Image";
import MainButton from "../ui/MainButton";
import { motion } from "framer-motion";

const TicketListItem = (props) => {
  const { ticket } = props;

  const showDetails = () => {
    props.onClick(ticket);
  };

  const date = new Date(ticket.datetime);
  const day = date
    .toLocaleString("de-de", {
      weekday: "long",
    })
    .slice(0, 2);
  const dateString = date.toLocaleDateString();
  const timeString = date.toLocaleTimeString();

  return (
    <motion.div
      layout
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: -10 }}
      className={styles.listItem}
    >
      <Image src={ticket.movie.poster} className={styles.poster} />
      <div className={styles.info}>
        <div className={styles.details}>
          <h2>{ticket.movie.title}</h2>
          <h3 className="mt-1">{ticket.cinema}</h3>
          <MainButton className={styles.button} onClick={showDetails}>
            Details
          </MainButton>
        </div>
        <div className={styles.date}>
          <h3>{day}</h3>
          <h4>{dateString}</h4>
          <h4>{timeString}</h4>
        </div>
      </div>
    </motion.div>
  );
};

export default TicketListItem;
