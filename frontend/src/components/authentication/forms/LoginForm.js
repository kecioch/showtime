import Form from "react-bootstrap/Form";
import { useState } from "react";
import LoadingButton from "../../ui/LoadingButton";

const LoginForm = ({onSubmit, error, isLoading}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (ev) => {
    ev.preventDefault();
    onSubmit({ username, password });
  };

  const errorMsg = error && <p className="text-danger">{error}</p>;

  return (
    <Form className="mt-3" onSubmit={submitHandler}>
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
      <LoadingButton variant="primary" type="submit" className="mt-2" isLoading={isLoading}>
        Einloggen
      </LoadingButton>
    </Form>
  );
};

export default LoginForm;
