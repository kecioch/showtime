import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { useEffect, useState } from "react";
import LoadingButton from "../ui/LoadingButton";

const SeatTypeModal = (props) => {
  const { selected, isNew } = props;

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [colorHEX, setColorHEX] = useState("#d4ded4");

  const submitHandler = (ev) => {
    ev.preventDefault();
    props.onSubmit({ ...selected, title, price, colorHEX });
  };

  useEffect(() => {
    if (isNew || !selected) {
      setTitle("");
      setPrice(0);
      setColorHEX("#d4ded4");
    } else {
      setTitle(selected.title);
      setPrice(selected.price);
      setColorHEX(selected.colorHEX);
    }
  }, [isNew, selected]);

  return (
    <Modal show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          Sitzplatz-Typ {props.isNew ? "erstellen" : "bearbeiten"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.error && <p className="text-danger">{props.error}</p>}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Bezeichnung</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
              required
            />
          </Form.Group>
          <div className="d-flex gap-3">
            <Form.Group className="mb-3 flex-fill" controlId="price">
              <Form.Label>Preis</Form.Label>
              <Form.Control
                type="number"
                min={0}
                value={price}
                onChange={(ev) => setPrice(ev.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Farbe</Form.Label>
              <Form.Control
                type="color"
                value={colorHEX}
                onChange={(ev) => setColorHEX(ev.target.value)}
                required
              />
            </Form.Group>
          </div>
          <div className="d-flex gap-3 mt-3">
            <Button
              className="flex-fill"
              variant="secondary"
              onClick={props.onClose}
            >
              Abbrechen
            </Button>
            <LoadingButton
              type="sumit"
              className="flex-fill"
              variant="success"
              isLoading={props.isLoading}
            >
              {props.isNew ? "Erstellen" : "Aktualisieren"}
            </LoadingButton>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SeatTypeModal;
