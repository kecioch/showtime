import Container from "../../components/ui/Container";
import Content from "../../components/ui/Content";
import { BACKEND_URL } from "../../constants";
import CinemaConfig from "../../components/cinemas/forms/CinemaConfig";

const NewCinema = () => {
  const createCinemaHandler = (cinema) => {
    console.log("CREATECINEMAHANDLER",cinema);

    fetch(`${BACKEND_URL}/cinemas`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cinema),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <Container>
      <Content>
        <h1>Neuer Kinosaal</h1>
        <CinemaConfig onSubmit={createCinemaHandler} isNew={true} />
      </Content>
    </Container>
  );
};

export default NewCinema;
