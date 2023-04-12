import { useParams, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import Container from "../../ui/Container";
import Content from "../../ui/Content";
import CinemaConfig from "../../components/cinemas/forms/CinemaConfig";
import { BACKEND_URL } from "../../constants";

const EditCinema = (props) => {
  const { id } = useParams();
  const [cinema, setCinema] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      console.log(BACKEND_URL);
      try {
        const res = await fetch(`${BACKEND_URL}/cinemas/${id}`);
        const data = await res.json();
        console.log(data);
        if (data.code === 404) navigate("/cinemas");
        else setCinema(data);
      } catch (err) {
        console.log("ERROR", err);
      }
    };
    fetchMovie();
  }, []);

  const updateCinemaHandler = async (updatedCinema) => {
    console.log("PUT", updatedCinema);
    fetch(`${BACKEND_URL}/cinemas/${cinema.title}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCinema),
    }).then((res) => console.log(res));
  };

  return (
    <Container>
      <Content>
        <h1>Kinosaal bearbeiten</h1>
        <CinemaConfig cinema={cinema} onSubmit={updateCinemaHandler} isNew={false} />
      </Content>
    </Container>
  );
};

export default EditCinema;
