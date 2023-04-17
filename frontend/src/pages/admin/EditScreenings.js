import Container from "../../components/ui/Container";
import Content from "../../components/ui/Content";
import Button from "react-bootstrap/esm/Button";
import { useEffect, useRef, useState } from "react";
import { BACKEND_URL } from "../../constants";
import Modal from "react-bootstrap/Modal";
import FormSelect from "react-bootstrap/FormSelect";
import Form from "react-bootstrap/Form";
import Screeningplan from "../../components/screeningplan/Screeningplan";
import DeleteModal from "../../components/modals/DeleteModal";

const EditScreenings = (props) => {
  const [cinemas, setCinemas] = useState([]);
  const [movies, setMovies] = useState([]);
  const [screenings, setScreenings] = useState([]);
  const [showNewScreeningModal, setShowNewScreeningModal] = useState(false);
  const [selectedTime, setSelectedTime] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteScreening, setDeleteScreening] = useState();
  const selectedCinema = useRef();
  const selectedMovie = useRef();
  const selectedWeekday = useRef();

  const addScreeningHandler = () => {
    const movie = movies.find((m) => m.title === selectedMovie.current.value);
    const cinema = cinemas.find(
      (c) => c.title === selectedCinema.current.value
    );

    const screening = {
      weekday: selectedWeekday.current.value,
      time: selectedTime,
      movie,
      cinema,
    };
    console.log("ADDSCREENING", screening);

    fetch(`${BACKEND_URL}/screenings/schedule`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(screening),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("POST RESULT DATA", data);
        setScreenings((screenings) => [...screenings, data]);
      });
  };

  const deleteScreeningHandler = () => {
    console.log("DELETE SCREENING", deleteScreening);
    fetch(`${BACKEND_URL}/screenings/schedule/${deleteScreening}`, {
      method: "DELETE",
    }).then((res) => {
      console.log(res);
      if (res.status !== 200) return;
      setShowDeleteModal(false);
      setScreenings((prev) => {
        const screenings = prev.filter((el) => el._id !== deleteScreening);
        return screenings;
      });
    });
  };

  const onDeleteScreening = (screeningID) => {
    setDeleteScreening(screeningID);
    console.log("SCREENINGID", screeningID);
    setShowDeleteModal(true);
  };

  useEffect(() => {
    fetch(`${BACKEND_URL}/screenings/schedule`)
      .then((res) => res.json())
      .then((data) => {
        console.log("FETCH SCREENINGS", data);
        setScreenings(data);
      })
      .catch((err) => console.log(err));

    fetch(`${BACKEND_URL}/movies`)
      .then((res) => res.json())
      .then((data) => {
        console.log("FETCH MOVIES", data);
        setMovies(data);
      })
      .catch((err) => console.log(err));

    fetch(`${BACKEND_URL}/cinemas`)
      .then((res) => res.json())
      .then((data) => {
        console.log("FETCH CINEMAS", data);
        setCinemas(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const movieOptions = movies?.map((m, i) => (
    <option key={i}>{m.title}</option>
  ));

  const cinemaOptions = cinemas?.map((c, i) => (
    <option key={i}>{c.title}</option>
  ));

  return (
    <>
      <Container>
        <Content>
          <h1>Filmvorführungen</h1>
          <hr />
          <Button
            className="mb-3"
            onClick={() => setShowNewScreeningModal(true)}
          >
            Hinzufügen
          </Button>
          {screenings?.length > 0 ? (
            <Screeningplan
              cinemas={cinemas}
              screenings={screenings}
              onDelete={onDeleteScreening}
            />
          ) : (
            <h3>Keine Filmvorführungen</h3>
          )}
        </Content>
      </Container>
      <Modal
        show={showNewScreeningModal}
        onHide={() => setShowNewScreeningModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Neue Filmvorführung</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="movie">
            <Form.Label>Film</Form.Label>
            <FormSelect ref={selectedMovie} required={true}>
              {movieOptions}
            </FormSelect>
          </Form.Group>
          <Form.Group className="mb-3" controlId="cinema">
            <Form.Label>Kinosaal</Form.Label>
            <FormSelect ref={selectedCinema} required={true}>
              {cinemaOptions}
            </FormSelect>
          </Form.Group>
          <Form.Group className="mb-3" controlId="time">
            <Form.Label>Zeit</Form.Label>
            <Form.Control
              type="time"
              onChange={(ev) => setSelectedTime(ev.target.value)}
              required={true}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="weekday">
            <Form.Label>Wochentag</Form.Label>
            <FormSelect ref={selectedWeekday} required={true}>
              <option value="Monday">Montag</option>
              <option value="Tuesday">Dienstag</option>
              <option value="Wednesday">Mittwoch</option>
              <option value="Thursday">Donnerstag</option>
              <option value="Friday">Freitag</option>
              <option value="Saturday">Samstag</option>
              <option value="Sunday">Sonntag</option>
            </FormSelect>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowNewScreeningModal(false)}
          >
            Abbrechen
          </Button>
          <Button variant="success" onClick={addScreeningHandler}>
            Hinzufügen
          </Button>
        </Modal.Footer>
      </Modal>
      <DeleteModal
        show={showDeleteModal}
        title="Filmvorführung"
        text="Wollen Sie wirklich die Filmvorführung löschen?"
        onClose={() => setShowDeleteModal(false)}
        onDelete={deleteScreeningHandler}
      />
    </>
  );
};

export default EditScreenings;
