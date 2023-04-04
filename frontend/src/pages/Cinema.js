import SeatMap from "../components/seatmap/SeatMap";
import Container from "../ui/Container";
import Content from "../ui/Content";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../constants";
import { useParams } from "react-router-dom";

const Cinema = (props) => {
  const { id } = useParams();
  const [cinema, setCinema] = useState();

    const seatClickHandler = () => {

    };

  useEffect(() => {
    fetch(`${BACKEND_URL}/cinemas/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.code !== 404) setCinema(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      <Content>
        {!cinema && <h1>Kinosaal not found</h1>}
        {cinema && <h1>{cinema?.title}</h1>}
        {cinema && <SeatMap data={cinema} onSeatClick={seatClickHandler} editMode={false} />}
      </Content>
    </Container>
  );
};

export default Cinema;
