import Button from "react-bootstrap/esm/Button";
import LoginForm from "../components/authentication/forms/LoginForm";
import Container from "../components/ui/Container";
import Content from "../components/ui/Content";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import styles from "./Login.module.css";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

const Login = (props) => {
  const { login, isLoggedIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  const submitHandler = async (user) => {
    console.log("LOGIN", user.username, user.password);
    setIsFetching(true);
    await login(user.username, user.password).then((success) => {
      setIsFetching(false);
      console.log("LOGIN SUCCESS ?", success);
      if (!success) {
        setError("Login fehlgeschlagen");
        return;
      }

      console.log("NOW BACK TO REQUESTED PATH", location.state?.from);
      if (location.state?.from) {
        console.log("REDIRECTING BACK TO REQUESTED");
        navigate(location.state.from);
      } else {
        console.log("REDIRECTING BACK NO REEQUSTED PAGE ");
        navigate("/");
      }
    });
  };

  if (isLoggedIn) return <Navigate to="/" />;

  return (
    <Container>
      <Content>
        <div className="d-flex justify-content-center">
          <div className={styles.login}>
            <h1>Login</h1>
            <LoginForm
              error={error}
              onSubmit={submitHandler}
              isLoading={isFetching}
            />
            <hr />
            <Link to="/register">
              <Button variant="secondary">Registrieren</Button>
            </Link>
          </div>
        </div>
      </Content>
    </Container>
  );
};

export default Login;
