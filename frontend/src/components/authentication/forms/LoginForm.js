import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (ev) => {
    ev.preventDefault();
    props.onSubmit({ username, password });
  };

  const errorMsg = props.error && <p className="text-danger">{props.error}</p>;

  return (
    <Form className="mt-3" onSubmit={onSubmit}>
      {errorMsg}
      <Form.Group className="mb-3" controlId="id">
        <Form.Label>Benutzername</Form.Label>
        <Form.Control
          type="text"
          placeholder="Benutzernamen eingeben..."
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
      <Button variant="primary" type="submit" className="mt-2">
        Einloggen
      </Button>
    </Form>
  );
};

export default LoginForm;
