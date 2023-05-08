import Container from "../../components/ui/Container";
import Content from "../../components/ui/Content";
import { BACKEND_URL } from "../../constants";
import CinemaConfig from "../../components/cinemas/forms/CinemaConfig";
import useFetch from "../../hooks/useFetch";

const NewCinema = () => {
  const { fetch, isFetching, errorMsg } = useFetch();

  const createCinemaHandler = (cinema) => {
    console.log("CREATECINEMAHANDLER", cinema);

    fetch
      .post(`${BACKEND_URL}/cinemas`, cinema)
      .then((res) => console.log(res));
  };

  return (
    <Container>
      <Content>
        <h1>Neuer Kinosaal</h1>
        <CinemaConfig
          onSubmit={createCinemaHandler}
          isLoading={isFetching}
          error={errorMsg}
          isNew={true}
        />
      </Content>
    </Container>
  );
};

export default NewCinema;
