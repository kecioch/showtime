import Modal from "react-bootstrap/Modal";
import Payment from "../payment/forms/Payment";

const PaymentModal = props => {
    return (
        <Modal
        show={props.show}
        onHide={props.onClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Bezahlung</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Payment cart={props.cart} />
        </Modal.Body>
      </Modal>
    );
};

export default PaymentModal;