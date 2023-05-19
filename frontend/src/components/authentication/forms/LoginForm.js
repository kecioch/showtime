import Form from "react-bootstrap/Form";
import { useState } from "react";
import LoadingButton from "../../ui/LoadingButton";
import { Key, KeyFill, Person, PersonFill } from "react-bootstrap-icons";
import { InputGroup } from "react-bootstrap";
import PasswordInput from "./PasswordInput";

const LoginForm = ({ onSubmit, error, isLoading }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (ev) => {
    ev.preventDefault();
    onSubmit({ username, password });
  };

  const errorMsg = error && <p className="text-danger">{error}</p>;

  return (
    <Form className="pt-3" onSubmit={submitHandler}>
      {errorMsg}
      <Form.Group className="mb-3" controlId="id">
        <Form.Label>Benutzername</Form.Label>
        <InputGroup>
          <InputGroup.Text id="inputUsername">
            <PersonFill />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Benutzernamen eingeben..."
            onChange={(ev) => setUsername(ev.target.value)}
          />
        </InputGroup>
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Passwort</Form.Label>
        <PasswordInput
          placeholder="Passwort eingeben"
          icon={true}
          onChange={(ev) => setPassword(ev.target.value)}
        />
      </Form.Group>
      <LoadingButton
        variant="primary"
        type="submit"
        className="mt-2"
        isLoading={isLoading}
      >
        Einloggen
      </LoadingButton>
    </Form>
  );
};

export default LoginForm;
