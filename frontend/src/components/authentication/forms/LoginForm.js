import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const LoginForm = (props) => {
  return (
    <Form className="mt-3">
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Benutzername</Form.Label>
        <Form.Control type="text" placeholder="Benutzernamen eingeben..." />
      </Form.Group>
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Passwort</Form.Label>
        <Form.Control type="password" placeholder="Passwort eingeben..." />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-2">
        Einloggen
      </Button>
    </Form>
  );
};

export default LoginForm;
