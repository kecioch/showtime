import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";

const RegisterForm = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmit = (ev) => {
    ev.preventDefault();
    const newUser = { username, password, firstName, lastName, email };
    props.onSubmit(newUser);
  };

  const errorMsg = props.error && <p className="text-danger">{props.error}</p>;

  return (
    <Form className="mt-3" onSubmit={onSubmit}>
      {errorMsg}
      <Form.Group className="mb-3" controlId="firstName">
        <Form.Label>Vorname</Form.Label>
        <Form.Control
          type="text"
          placeholder="Vorname eingeben..."
          onChange={(ev) => setFirstName(ev.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="lastName">
        <Form.Label>Nachname</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nachname eingeben..."
          onChange={(ev) => setLastName(ev.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Benutzername</Form.Label>
        <Form.Control
          type="text"
          placeholder="Benutzername eingeben..."
          onChange={(ev) => setUsername(ev.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Passwort</Form.Label>
        <Form.Control
          type="password"
          placeholder="Passwort eingeben..."
          onChange={(ev) => setPassword(ev.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="eMail">
        <Form.Label>E-Mail</Form.Label>
        <Form.Control
          type="email"
          placeholder="E-Mail eingeben..."
          onChange={(ev) => setEmail(ev.target.value)}
        />
      </Form.Group>
      <Button type="submit">Registrieren</Button>
    </Form>
  );
};

export default RegisterForm;
