import Button from "react-bootstrap/esm/Button";
import LoginForm from "../components/authentication/forms/LoginForm";
import Container from "../components/ui/Container";
import Content from "../components/ui/Content";
import { Link } from "react-router-dom";

const Login = (props) => {
  return (
    <Container>
      <Content>
        <div>
          <h1>Login</h1>
          <LoginForm />
          <hr />
          <Link to="/register">
          <Button>Registrieren</Button>
          </Link>
        </div>
      </Content>
    </Container>
  );
};

export default Login;
