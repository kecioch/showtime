import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import LoadingButton from "../ui/LoadingButton";
import { useState } from "react";
import { BACKEND_URL } from "../../constants";

const TicketValidationModal = (props) => {
  const [isValidating, setIsValidating] = useState(false);
  const ticket = props.ticket;

  const validateHandler = async () => {
    console.log("VALIDATE", ticket.id);

    try {
      setIsValidating(true);
      const res = await fetch(`${BACKEND_URL}/tickets/validate/${ticket.id}`, {
        method: "PATCH",
      });
      setIsValidating(false);

      if (res.status === 200) {
        console.log("SUCCESS VALIDATING");
        props.onClose();
      }
    } catch (err) {
      setIsValidating(false);
    }
  };

  const seats = ticket?.seats.map((seat, i) => (
    <li className="list-group-item" key={i}>
      Reihe: {seat.row} / Platz: {seat.col} [{seat.type.title}]
    </li>
  ));

  const title = ticket?.checked ? (
    <span className="text-danger">Ticket wurde bereits verwendet</span>
  ) : (
    <span className="text-success">Ticket ist valide</span>
  );

  return (
    <Modal show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {ticket && (
          <>
            <h4>TicketID:</h4>
            <p> {ticket.id}</p>
            <h4>Film:</h4>
            <p> {ticket.movie}</p>
            <h4>Kino:</h4>
            <p> {ticket.cinema}</p>
            <h4>Zeit:</h4>
            <p> {new Date(ticket.datetime).toLocaleString()}</p>
            <h4>Kunde:</h4>
            <p>
              {" "}
              {ticket.customer.name} {`<${ticket.customer.email}>`}
            </p>
            <h4>Sitzplätze:</h4>
            <ul className="list-group">{seats}</ul>
          </>
        )}
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <div className="d-flex gap-3 flex-fill">
          <Button
            className="flex-fill"
            variant="secondary"
            onClick={props.onClose}
          >
            Abbrechen
          </Button>
          {!ticket?.checked && (
            <LoadingButton
              className="flex-fill"
              isLoading={isValidating}
              variant="success"
              onClick={validateHandler}
            >
              Abstempeln
            </LoadingButton>
          )}
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default TicketValidationModal;
