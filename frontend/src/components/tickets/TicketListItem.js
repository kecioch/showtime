import styles from "./TicketListItem.module.css";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/esm/Button";

const TicketListItem = (props) => {
  const { ticket } = props;

  const showDetails = () => {
    props.onClick(ticket);
  };

  return (
    <div className={styles.listItem}>
      <Image src={ticket.movie.poster} className={styles.poster} />
      <div>
        <h3 className="mt-3">{ticket.movie.title}</h3>
        <h4 className="mt-3">{ticket.cinema}</h4>
        <h4>{new Date(ticket.datetime).toLocaleString()}</h4>
        <Button className="mt-2" onClick={showDetails}>Details</Button>
      </div>
    </div>
  );
};

export default TicketListItem;
