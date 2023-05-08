import Modal from "react-bootstrap/Modal";
import SVG from "react-inlinesvg";
import { ListGroupItem } from "react-bootstrap";
import ListGroupStyled from "../lists/ListGroupStyled";

const TicketModal = (props) => {
  const { ticket } = props;

  const seats = ticket?.seats.map((seat, i) => (
    <ListGroupItem key={i}>
      Reihe: {seat.row} / Platz: {seat.col} [{seat.type.title}]
    </ListGroupItem>
  ));

  return (
    <Modal show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ticket</Modal.Title>
      </Modal.Header>
      <Modal.Body>{ticket && <SVG src={ticket.codeSVG} />}</Modal.Body>
      <Modal.Footer className="d-flex justify-content-center text-center">
        {ticket && (
          <div className="w-100">
            <h2>{ticket.movie.title}</h2>
            <h3>{ticket.cinema}</h3>
            <h3>{new Date(ticket.datetime).toLocaleString()}</h3>
            <h3 className="mt-4 mb-3">Sitzplätze</h3>
            <ListGroupStyled>{seats}</ListGroupStyled>
          </div>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default TicketModal;
