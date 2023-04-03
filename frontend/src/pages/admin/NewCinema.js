import SeatMap from "../../components/seatmap/SeatMap";
import Container from "../../ui/Container";
import Content from "../../ui/Content";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";

const NewCinema = () => {
  const [rowCnt, setRowCnt] = useState(10);
  const [colCnt, setColCnt] = useState(10);
  const [seatMap, setSeatMap] = useState([]);

  useEffect(() => {
    console.log("USEEFFECT");
    const DATA = [];
    for (let r = 0; r < rowCnt; r++) {
      const row = [];
      for (let c = 0; c < colCnt; c++) {
        row.push({
          row: r,
          col: c,
          status: "unselected",
          type: "empty",
        });
      }
      DATA.push(row);
    }
    setSeatMap(DATA);
    console.log(seatMap);
  }, []);

  const seatClickHandler = (seat) => {
    if (seat.type === "standard") return;

    console.log("SEATCLICKHANDLER", seat);
    // if (seat.status === "empty") seat.status = "unselected";
    // else if (seat.status === "unselected") seat.status = "selected";
    // else if (seat.status === "selected") seat.status = "booked";
    // else return;
    seat.type = "standard";

    setSeatMap((map) => {
      const updatedMap = [...map];
      updatedMap[seat.row] = [...map[seat.row]];
      updatedMap[seat.row][seat.col] = seat;
      return updatedMap;
    });
    console.log("NEW SEAT MAP", seatMap);
  };

  return (
    <Container>
      <Content>
        <h1>Neuer Kinosaal</h1>
        <Form>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Titel</Form.Label>
            <Form.Control
              type="text"
              placeholder="Titel eingeben..."
            />
            <Button variant="primary" type="submit" className="mt-2">
                Erstellen
            </Button>
          </Form.Group>
        </Form>
        <hr />
        <SeatMap
          data={seatMap}
          editMode={true}
          onSeatClick={seatClickHandler}
        />
      </Content>
    </Container>
  );
};

export default NewCinema;
