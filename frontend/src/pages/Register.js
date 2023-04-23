import Button  from "react-bootstrap/Button";
import Container from "../components/ui/Container";
import Content from "../components/ui/Content";
import Form from "react-bootstrap/Form";

const Register = (props) => {
  return (
    <Container>
      <Content>
        <h1>Register</h1>
        <Form className="mt-3">
          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label>Vorname</Form.Label>
            <Form.Control type="text" placeholder="Vorname eingeben..." />
          </Form.Group>
          <Form.Group className="mb-3" controlId="lastName">
            <Form.Label>Nachname</Form.Label>
            <Form.Control type="text" placeholder="Nachname eingeben..." />
          </Form.Group>
          <Form.Group className="mb-3" controlId="eMail">
            <Form.Label>E-Mail</Form.Label>
            <Form.Control type="email" placeholder="E-Mail eingeben..." />
          </Form.Group>
          <Button type="submit">Registrieren</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Register;
