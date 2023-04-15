import Container from "../../ui/Container";
import Content from "../../ui/Content";
import Button from "react-bootstrap/esm/Button";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../constants";
import Modal from "react-bootstrap/Modal";
import FormSelect from "react-bootstrap/FormSelect";
import Form from "react-bootstrap/Form";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import Screeningplan from "../../components/screeningplan/Screeningplan";

const EditScreenings = (props) => {
  /**
   * SCREENING_SCHEDULED
   * date: weekday
   * time
   * movie_id
   * cinema_id
   *
   * SCREENING
   * screening_scheduled_id
   * date
   * bookedSeats
   *
   * TICKET
   * screening_id
   * qrcode_url
   * customer
   *      vorname
   *      nachname
   *      email
   * seat
   *      row
   *      col
   */

  const [cinemas, setCinemas] = useState([]);
  const [movies, setMovies] = useState([]);
  const [screenings, setScreenings] = useState([]);
  const [showNewScreeningModal, setShowNewScreeningModal] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState();
  const [selectedCinema, setSelectedCinema] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [selectedWeekday, setSelectedWeekday] = useState("Monday");

  const addScreeningHandler = () => {
    const movie = movies.find((m) => m.title === selectedMovie);
    const cinema = cinemas.find((c) => c.title === selectedCinema);

    const screening = {
      weekday: selectedWeekday,
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
      .then((data) => console.log(data));
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
        setSelectedMovie(data[0].title);
      })
      .catch((err) => console.log(err));

    fetch(`${BACKEND_URL}/cinemas`)
      .then((res) => res.json())
      .then((data) => {
        console.log("FETCH CINEMAS", data);
        setCinemas(data);
        setSelectedCinema(data[0].title);
      })
      .catch((err) => console.log(err));
  }, []);

  const movieOptions = movies?.map((m, i) => (
    <option key={i}>{m.title}</option>
  ));

  const cinemaOptions = cinemas?.map((c, i) => (
    <option key={i}>{c.title}</option>
  ));

  //   const screeningItems = screenings?.map((s, i) => (
  //     <p key={i}>{`${s.cinema.title} / ${s.movie.title} / ${s.weekday} / ${s.time}`}</p>
  //   ));

  return (
    <>
      <Container>
        <Content>
          <h1>Filmvorführungen</h1>
          <Button onClick={() => setShowNewScreeningModal(true)}>
            Hinzufügen
          </Button>
          {screenings?.length > 0 ? (
            <Screeningplan cinemas={cinemas} screenings={screenings} />
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
            <FormSelect
              onChange={(ev) => setSelectedMovie(ev.target.value)}
              required={true}
            >
              {movieOptions}
            </FormSelect>
          </Form.Group>
          <Form.Group className="mb-3" controlId="cinema">
            <Form.Label>Kinosaal</Form.Label>
            <FormSelect
              onChange={(ev) => setSelectedCinema(ev.target.value)}
              required={true}
            >
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
            <FormSelect
              onChange={(ev) => setSelectedWeekday(ev.target.value)}
              required={true}
            >
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
    </>
  );
};

export default EditScreenings;
