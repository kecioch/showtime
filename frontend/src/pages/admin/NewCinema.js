import Container from "../../components/ui/Container";
import Content from "../../components/ui/Content";
import { BACKEND_URL } from "../../constants";
import CinemaConfig from "../../components/cinemas/forms/CinemaConfig";
import useFetch from "../../hooks/useFetch";
import useFlash from "../../hooks/useFlash";

const NewCinema = () => {
  const { fetch, isFetching, errorMsg } = useFetch();
  const { createMessage } = useFlash();

  const createCinemaHandler = (cinema) => {
    fetch.post(`${BACKEND_URL}/cinemas`, cinema).then((res) => {
      if (res.status === 200)
        createMessage({
          text: "Kinosaal wurde erfolgreich erstellt",
          variant: "success",
        });
    });
  };

  return (
    <Container>
      <Content style={{minHeight: "75vh"}}>
        <h1 className="mb-4">Neuer Kinosaal</h1>
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
