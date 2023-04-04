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

  const seatClickHandler = (seat) => {
    console.log("SEATCLICKHANDLER", seat);

    if (seat.type === "standard") seat.type = "empty";
    else seat.type = "standard";

    // if (seat.status === "empty") seat.status = "unselected";
    // else if (seat.status === "unselected") seat.status = "selected";
    // else if (seat.status === "selected") seat.status = "booked";
    // else return;

    setSeatMap((map) => {
      const updatedMap = [...map];
      updatedMap[seat.row] = [...map[seat.row]];
      updatedMap[seat.row][seat.col] = seat;
      return updatedMap;
    });
    console.log("NEW SEAT MAP", seatMap);
  };

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
  }, [rowCnt,colCnt]);

  return (
    <Container>
      <Content>
        <h1>Neuer Kinosaal</h1>
        <Form>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Titel</Form.Label>
            <Form.Control type="text" placeholder="Titel eingeben..." />
            <Button variant="primary" type="submit" className="mt-2">
              Erstellen
            </Button>
          </Form.Group>
        </Form>
        <hr />
        <div className="d-flex flex-row justify-content-center gap-3">
          <Form.Group className="mb-3" controlId="rowCnt">
            <Form.Label>Reihen</Form.Label>
            <Form.Control type="number" defaultValue={rowCnt} min={1} onChange={(ev) => setRowCnt(ev.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="colCnt">
            <Form.Label>Sitzplätze</Form.Label>
            <Form.Control type="number" defaultValue={colCnt} min={1} onChange={(ev) => setColCnt(ev.target.value)}/>
          </Form.Group>
        </div>
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
