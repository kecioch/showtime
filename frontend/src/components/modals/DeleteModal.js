import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";

const DeleteModal = (props) => {
  return (
    <Modal show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.text}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Abbrechen
        </Button>
        <Button variant="danger" onClick={props.onDelete}>
          Löschen
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;