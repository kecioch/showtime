import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import SeatMap from "../../seatmap/SeatMap";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../../../constants";

const CinemaConfig = (props) => {
  const [title, setTitle] = useState("");
  const [rowCnt, setRowCnt] = useState(10);
  const [colCnt, setColCnt] = useState(10);
  const [seatMap, setSeatMap] = useState({});
  const [selectedSeatType, setSelecteSeatType] = useState();
  const [seatTypes, setSeatTypes] = useState();

  const seatClickHandler = (seat) => {
    console.log("SEATCLICKHANDLER", seat);

    if (seat.type?.title === selectedSeatType.title) seat.type = null;
    else seat.type = selectedSeatType;

    // if (seat.status === "empty") seat.status = "unselected";
    // else if (seat.status === "unselected") seat.status = "selected";
    // else if (seat.status === "selected") seat.status = "booked";
    // else return;

    setSeatMap((prev) => {
      const updatedMap = {
        map: {
          rows: [...prev.map.rows],
        },
      };
      updatedMap.map.rows[seat.row] = [...prev.map.rows[seat.row]];
      updatedMap.map.rows[seat.row][seat.col] = seat;
      return updatedMap;
    });
    console.log("NEW SEAT MAP", seatMap);
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    console.log("SUBMIT CINEMA CONFIG");
    const cinema = {
      title,
      map: seatMap.map,
    };
    props.onSubmit(cinema);
  };

  useEffect(() => {
    console.log("USEEFFECT");

    // Fetch SeatTypes
    fetch(`${BACKEND_URL}/seattypes`)
      .then((res) => res.json())
      .then((data) => {
        console.log("SEATTYPES", data);
        setSeatTypes(data);
        setSelecteSeatType(data[0]);

        // Create SeatMap
        const DATA = {
          map: {
            rows: [],
          },
        };
        for (let r = 0; r < rowCnt; r++) {
          const row = [];
          for (let c = 0; c < colCnt; c++) {
            row.push({
              row: r,
              col: c,
              status: "unselected",
            });
          }
          DATA.map.rows.push(row);
        }
        setSeatMap(DATA);
        console.log(seatMap);
      });
  }, [rowCnt, colCnt]);

  useEffect(() => {
    if (!props.cinema) return;

    console.log("CINEMA CONFIG", props.cinema);
    console.log("LEN", props?.cinema?.map?.rows?.length);
    setTitle(props.cinema.title);
    setRowCnt(props?.cinema?.map?.rows?.length);
    setColCnt(props?.cinema?.map?.rows[0]?.length);
    setSeatMap({ map: props.cinema.map });
    console.log(seatMap);
  }, [props.cinema]);

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Titel</Form.Label>
          <Form.Control
            type="text"
            placeholder="Titel eingeben..."
            onChange={(ev) => setTitle(ev.target.value)}
            value={title}
          />
          <Button
            variant="primary"
            type="submit"
            className="mt-2"
            onClick={onSubmit}
          >
            {props.isNew ? "Erstellen" : "Aktualisieren"}
          </Button>
        </Form.Group>
      </Form>
      <hr />
      <div className="d-flex flex-row justify-content-center gap-3">
        <Form.Group className="mb-3" controlId="rowCnt">
          <Form.Label>Reihen</Form.Label>
          <Form.Control
            type="number"
            value={rowCnt}
            min={1}
            onChange={(ev) => setRowCnt(ev.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="colCnt">
          <Form.Label>Sitzplätze</Form.Label>
          <Form.Control
            type="number"
            value={colCnt}
            min={1}
            onChange={(ev) => setColCnt(ev.target.value)}
          />
        </Form.Group>
      </div>
      <SeatMap data={seatMap} editMode={true} onSeatClick={seatClickHandler} />
    </>
  );
};

export default CinemaConfig;
