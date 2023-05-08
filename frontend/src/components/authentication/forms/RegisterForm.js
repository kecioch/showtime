import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import LoadingButton from "../../ui/LoadingButton";
import styles from "./RegisterForm.module.css";

const RegisterForm = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const user = props.user;
    if (!user) return;
    console.log(user);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setUsername(user.username);
    setEmail(user.email);
  }, [props.user]);

  const onSubmit = (ev) => {
    ev.preventDefault();
    const newUser = { username, password, firstName, lastName, email };
    props.onSubmit(newUser);
  };

  const errorMsg = props.error && <p className="text-danger">{props.error}</p>;

  return (
    <Form onSubmit={onSubmit}>
      {errorMsg}
      <Form.Group className="mb-3" controlId="firstName">
        <Form.Label>Vorname</Form.Label>
        <Form.Control
          type="text"
          placeholder="Vorname eingeben..."
          value={firstName}
          onChange={(ev) => setFirstName(ev.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="lastName">
        <Form.Label>Nachname</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nachname eingeben..."
          value={lastName}
          onChange={(ev) => setLastName(ev.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Benutzername</Form.Label>
        <Form.Control
          type="text"
          placeholder="Benutzername eingeben..."
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>
          {props.isUpdate ? "Neues Passwort" : "Passwort"}
        </Form.Label>
        <Form.Control
          type="password"
          placeholder="Passwort eingeben..."
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          required={!props.isUpdate}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="eMail">
        <Form.Label>E-Mail</Form.Label>
        <Form.Control
          type="email"
          placeholder="E-Mail eingeben..."
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
          required
        />
      </Form.Group>
      <LoadingButton type="submit" isLoading={props.isLoading} className={styles.submit}>
        {props.isUpdate ? "Änderungen speichern" : "Registrieren"}
      </LoadingButton>
    </Form>
  );
};

export default RegisterForm;
