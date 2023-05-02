import Modal from "react-bootstrap/Modal";
import SVG from "react-inlinesvg";

const TicketModal = (props) => {
  const { ticket } = props;

  const seats = ticket?.seats.map((seat, i) => (
    <li className="list-group-item" key={i}>
      Reihe: {seat.row} / Platz: {seat.col} [{seat.type.title}]
    </li>
  ));

  return (
    <Modal show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ticket</Modal.Title>
      </Modal.Header>
      <Modal.Body>{ticket && <SVG src={ticket.codeSVG} />}</Modal.Body>
      <Modal.Footer className="d-flex justify-content-center text-center">
        {ticket && (
          <div>
            <h2>{ticket.movie.title}</h2>
            <h3>{ticket.cinema}</h3>
            <h3>{new Date(ticket.datetime).toLocaleString()}</h3>
            <h3 className="mt-4">Sitzplätze</h3>
            <ul className="list-group">{seats}</ul>
          </div>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default TicketModal;
