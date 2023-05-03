import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import LoadingButton from "../ui/LoadingButton";

const DeleteModal = (props) => {
  return (
    <Modal show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.text}</Modal.Body>
      <Modal.Footer>
      <div className="d-flex gap-3 flex-fill">
        <Button className="flex-fill" variant="secondary" onClick={props.onClose}>
          Abbrechen
        </Button>
        <LoadingButton className="flex-fill" variant="danger" onClick={props.onDelete} isLoading={props.isLoading}>
          Löschen
        </LoadingButton>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
