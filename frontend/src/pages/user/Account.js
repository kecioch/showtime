import { useState } from "react";
import RegisterForm from "../../components/authentication/forms/RegisterForm";
import Container from "../../components/ui/Container";
import Content from "../../components/ui/Content";
import useAuth from "../../hooks/useAuth";
import { BACKEND_URL } from "../../constants";

const Account = (props) => {
  const { user, saveUser } = useAuth();
  const [isFetching, setIsFetching] = useState(false);
  const [errorMsg, setErrorMsg] = useState();

  const updateHandler = async (updatedUser) => {
    console.log("UPDATE USER", updatedUser);
    setIsFetching(true);
    try {
      const res = await fetch(`${BACKEND_URL}/authentication/update`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
        credentials: "include",
      });
      const data = await res.json();
      if (res.status === 200) {
        console.log(data);
        setErrorMsg(null);
        saveUser(data.user);
      } else {
        setErrorMsg(data.message);
        console.log("ERRORMSG",data.message)
      }
    } catch (err) {
      console.log(err);
    }
    setIsFetching(false);
  };

  return (
    <Container>
      <Content>
        <h1>Account bearbeiten</h1>
        <hr />
        <RegisterForm
          user={user}
          onSubmit={updateHandler}
          isUpdate={true}
          isLoading={isFetching}
          error={errorMsg}
        />
      </Content>
    </Container>
  );
};

export default Account;
