import RegisterForm from "../../components/authentication/forms/RegisterForm";
import Container from "../../components/ui/Container";
import Content from "../../components/ui/Content";
import useAuth from "../../hooks/useAuth";
import { BACKEND_URL } from "../../constants";
import useFetch from "../../hooks/useFetch";

const Account = (props) => {
  const { user, saveUser } = useAuth();
  const { fetch, isFetching, errorMsg } = useFetch();

  const updateHandler = (updatedUser) => {
    console.log("UPDATE USER", updatedUser);

    fetch
      .put(`${BACKEND_URL}/authentication/update`, updatedUser)
      .then((res) => {
        if (res.status !== 200) return;
        saveUser(res.user);
      });
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
