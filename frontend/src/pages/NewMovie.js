import Card from "react-bootstrap/Card";
import Container from "../ui/Container";
import ContentCard from "../ui/Content";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import styles from "./NewMovie.module.css";
import { useState } from "react";

const NewMovie = (props) => {
  const [title, setTitle] = useState();
  const [subtitle, setSubtitle] = useState();
  const [poster, setPoster] = useState();
  const [description, setDescription] = useState();

  const addMovieHandler = (ev) => {
    ev.preventDefault();
    fetch("http://localhost:4000/movies", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        subtitle,
        poster,
        description,
      }),
    }).then((res) => console.log(res));
  };

  return (
    <Container>
      <ContentCard>
        <h2>Neuen Film hinzufügen</h2>
        <label htmlFor="searchMovie">Film in Datenbank suchen</label>
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Suche"
          aria-label="Suche"
          style={{ zIndex: "1" }}
          id="searchMovie"
        />
        {/* <ListGroup className={styles.listGroup} variant="flush">
          <ListGroup.Item>Cras justo odio</ListGroup.Item>
          <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
          <ListGroup.Item>Morbi leo risus</ListGroup.Item>
          <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
          <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        </ListGroup> */}
        <Card className="mt-4 p-4">
          <Form onSubmit={addMovieHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Titel</Form.Label>
              <Form.Control
                type="text"
                placeholder="Titel eingeben..."
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Subtitel</Form.Label>
              <Form.Control
                type="text"
                placeholder="Subtitel eingeben..."
                onChange={(e) => setSubtitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Poster</Form.Label>
              <Form.Control
                type="text"
                placeholder="Bild URL eingeben..."
                onChange={(e) => setPoster(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Label>Beschreibung</Form.Label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </Form.Group>
            <Button variant="primary" type="submit">
              Erstellen
            </Button>
          </Form>
        </Card>
      </ContentCard>
    </Container>
  );
};

export default NewMovie;
