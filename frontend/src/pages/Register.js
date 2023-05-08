import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/authentication/forms/RegisterForm";
import Container from "../components/ui/Container";
import Content from "../components/ui/Content";
import styles from "./Register.module.css";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

const Register = (props) => {
  const {register} = useAuth();
  const navigate = useNavigate();
  const [error,setError] = useState();
  const [isFetching,setIsFetching] = useState(false);

  const submitHandler = async (user) => {
    console.log("REGISTER", user);
    setIsFetching(true);
    const res = await register(user);
    console.log("REGISTER RES", res);
    if (res.status === 200) navigate("/")
    else setError(res.message);
    setIsFetching(false);
  };

  return (
    <Container>
      <Content>
      <div className="d-flex justify-content-center">
        <div className={styles.register}>
          <h1>Registrieren</h1>
          <RegisterForm error={error} onSubmit={submitHandler} isLoading={isFetching} />
        </div>
        </div>
      </Content>
    </Container>
  );
};

export default Register;
