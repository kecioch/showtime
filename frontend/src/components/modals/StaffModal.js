import Modal from "react-bootstrap/Modal";
import RegisterForm from "../authentication/forms/RegisterForm";

const StaffModal = ({ show, onClose, isLoading, error, isNew, onSubmit }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          Mitarbeiter {isNew ? "anlegen" : "bearbeiten"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <p className="text-danger">{error}</p>}
        <RegisterForm isLoading={isLoading} onSubmit={onSubmit} />
      </Modal.Body>
    </Modal>
  );
};

export default StaffModal;
