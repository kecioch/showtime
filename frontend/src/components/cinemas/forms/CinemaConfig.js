import Form from "react-bootstrap/Form";
import SeatMap from "../../seatmap/SeatMap";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../../../constants";
import LoadingButton from "../../ui/LoadingButton";
import useFetch from "../../../hooks/useFetch";
import styles from "./CinemaConfig.module.css";

const CinemaConfig = (props) => {
  const [title, setTitle] = useState("");
  const [rowCnt, setRowCnt] = useState(10);
  const [colCnt, setColCnt] = useState(10);
  const [seatMap, setSeatMap] = useState();
  const [selectedSeatType, setSelectedSeatType] = useState();
  const [seatTypes, setSeatTypes] = useState();
  const [isInit, setIsInit] = useState(false);
  const { fetch } = useFetch();

  const seatClickHandler = (seat) => {
    if (seat.type?.title === selectedSeatType.title) seat.type = null;
    else seat.type = selectedSeatType;

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
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    const cinema = {
      title,
      map: seatMap.map,
    };
    props.onSubmit(cinema);
  };

  useEffect(() => {
    // Fetch SeatTypes
    fetch.get(`${BACKEND_URL}/seattypes`).then((res) => {
      if (res.status !== 200) return;
      setSeatTypes(res.data);
      setSelectedSeatType(res.data[0]);
    });
  }, []);

  useEffect(() => {
    if (props.cinema) {
      setTitle(props.cinema.title);
      if (!isInit) {
        setRowCnt(props?.cinema?.map?.rows?.length);
        setColCnt(props?.cinema?.map?.rows[0]?.length);
        setIsInit(true);
      }
      setSeatMap({ map: props.cinema.map });
    } else {
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
    }
  }, [props.cinema, rowCnt, colCnt]);

  useEffect(() => {
    if (seatMap) {
      const newRows = [];
      for (let r = 0; r < rowCnt; r++) {
        if (r < seatMap.map.rows.length) {
          const row = seatMap.map.rows[r].slice(0, colCnt);
          for (let c = seatMap.map.rows[r].length; c < colCnt; c++) {
            row.push({
              row: r,
              col: c,
              status: "unselected",
            });
          }
          newRows.push(row);
        } else {
          const row = [];
          for (let c = 0; c < colCnt; c++) {
            row.push({
              row: r,
              col: c,
              status: "unselected",
            });
          }
          newRows.push(row);
        }
      }
      setSeatMap({
        map: {
          rows: newRows,
        },
      });
    }
  }, [rowCnt, colCnt]);

  const seatTypeOptions = seatTypes?.map((type, i) => (
    <option key={i} value={type.title}>
      {type.title}
    </option>
  ));

  const changeSeatTypeHandler = (ev) => {
    const type = seatTypes.find((type) => type.title === ev.target.value);
    setSelectedSeatType(type);
  };

  const errorMsg = props.error && <p className="text-danger">{props.error}</p>;

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Titel</Form.Label>
          <div className="d-flex justify-content-center align-items-start gap-3">
            <Form.Control
              type="text"
              placeholder="Titel eingeben..."
              onChange={(ev) => setTitle(ev.target.value)}
              value={title}
            />
            <LoadingButton
              variant="primary"
              type="submit"
              onClick={onSubmit}
              isLoading={props.isLoading}
            >
              {props.isNew ? "Erstellen" : "Aktualisieren"}
            </LoadingButton>
          </div>
          {errorMsg}
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
      <hr />
      <div className="d-flex w-100 justify-content-center">
        <Form.Group className={styles.typeSelector} controlId="colCnt">
          <Form.Label>Sitzplatz Typ</Form.Label>
          <Form.Select
            aria-label="Sitzplatztyp"
            onChange={changeSeatTypeHandler}
          >
            {seatTypeOptions}
          </Form.Select>
        </Form.Group>
      </div>
      <SeatMap data={seatMap} editMode={true} onSeatClick={seatClickHandler} />
    </>
  );
};

export default CinemaConfig;
