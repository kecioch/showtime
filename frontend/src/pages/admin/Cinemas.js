import Container from "react-bootstrap/esm/Container";
import Content from "../../ui/Content";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../constants";
import CinemasList from "../../components/cinemas/CinemasList";
import Modal from "react-bootstrap/Modal";

const Cinemas = (props) => {
  const [cinemas, setCinemas] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteCinema, setDeleteCinema] = useState();

  useEffect(() => {
    fetch(`${BACKEND_URL}/cinemas`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCinemas(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteCinemaHandler = () => {
    console.log("DELETE", deleteCinema);
    fetch(`${BACKEND_URL}/cinemas/${deleteCinema.title}`, {
      method: "DELETE",
    }).then((res) => {
      console.log(res);
      setShowDeleteModal(false);
      setCinemas((prev) => {
        const cinemas = prev.filter((el) => el.title !== deleteCinema.title);
        return cinemas;
      });
    });
  };

  const onDeleteCinema = (cinema) => {
    console.log(cinema);
    setDeleteCinema(cinema);
    setShowDeleteModal(true);
  };

  return (
    <>
      <Container>
        <Content>
          <h1>Kinosaal Verwaltung</h1>
          <hr />
          <Link to="/cinemas/new">
            <Button className="mb-4" variant="primary">
              Neu
            </Button>
          </Link>
          {cinemas.length > 0 && (
            <CinemasList data={cinemas} onDelete={onDeleteCinema} />
          )}
          {cinemas.length <= 0 && <h2 className="text-muted text-center">Keine Kinosäle vorhanden</h2>}
        </Content>
      </Container>
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{deleteCinema?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Wollen Sie wirklich den Kinosaal löschen?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Abbrechen
          </Button>
          <Button variant="danger" onClick={deleteCinemaHandler}>
            Löschen
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Cinemas;
