import { useEffect, useState } from "react";
import Container from "../components/ui/Container";
import Content from "../components/ui/Content";
import { BACKEND_URL } from "../constants";
import { useNavigate, useParams } from "react-router-dom";
import Badge from "react-bootstrap/esm/Badge";
import Image from "react-bootstrap/esm/Image";
import styles from "./Ticketshop.module.css";
import { getTimeString } from "../services/FormatDate";
import SeatMap from "../components/seatmap/SeatMap";
import Button from "react-bootstrap/esm/Button";

const Ticketshop = (props) => {
  const { id } = useParams();
  const [screening, setScreening] = useState();
  const navigate = useNavigate();
  const [seatMap, setSeatMap] = useState();
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    console.log("REQ ID", id);
    fetch(`${BACKEND_URL}/screenings/ticketshop/${id}`)
      .then((res) => {
        if (res.status !== 200) navigate("/");
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setScreening(data);
        setSeatMap(data.scheduledScreening.cinema);
        console.log("MAP", data.scheduledScreening.cinema);
      })
      .catch((err) => navigate("/"));
  }, [id, navigate]);

  const onSeatClickHandler = (seat) => {
    if (!seat || seat?.type === "empty" || seat?.status === "booked") return;
    console.log("SEATCLICKED", seat);

    if (seat.status === "unselected") seat.status = "selected";
    else seat.status = "unselected";

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

  useEffect(() => {
    setSelectedTickets(
      seatMap?.map?.rows
        .flatMap((row) => row)
        .filter((seat) => seat.status === "selected")
    );
  }, [seatMap]);

  useEffect(() => {
    console.log("ST", selectedTickets);
    setTotalPrice(selectedTickets?.reduce((acc, curr) => acc + 8, 0));
  }, [selectedTickets]);

  const selectedTicketsElements = (
    <ul className={styles.cartList}>
      {selectedTickets?.map((seat, i) => {
        console.log("SEAT", seat);
        return (
          <li key={i}>{`1x Reihe: ${seat.row}, Platz: ${seat.col} (${seat.type})`}</li>
        );
      })}
    </ul>
  );

  return (
    <>
      {" "}
      <Container className={styles.containerHeader}>
        <Content>
          {screening && (
            <section>
              <div className={styles.headerInfo}>
                <Image
                  src={screening.scheduledScreening.movie.media.images.poster}
                  className={styles.poster}
                />

                <div>
                  <h1 className="mt-4">
                    {screening.scheduledScreening.movie.title}
                  </h1>
                  <p>
                    <Badge>
                      {
                        screening.scheduledScreening.movie.release
                          .ageRestriction
                      }
                    </Badge>{" "}
                    •{" "}
                    {screening.scheduledScreening.movie.release.productionYear}{" "}
                    (
                    {
                      screening.scheduledScreening.movie.release
                        .productionCountry
                    }
                    ) • {screening.scheduledScreening.movie.genres.join(", ")} •{" "}
                    {screening.scheduledScreening.movie.runtime}min
                  </p>
                  <h2 className="mt-5">
                    {screening.scheduledScreening.cinema.title}
                  </h2>
                  <h4 className="mt-3">
                    {new Date(screening.date).toLocaleString("de-de", {
                      weekday: "long",
                    })}
                  </h4>
                  <h4>
                    {new Date(screening.date).toLocaleDateString()},{" "}
                    {getTimeString(new Date(screening.scheduledScreening.time))}{" "}
                    Uhr
                  </h4>
                </div>
              </div>
            </section>
          )}
        </Content>
      </Container>
      <Container>
        <Content>
          <h2>Ticket Auswahl</h2>
          <div className="d-flex">
            <SeatMap
              data={seatMap}
              onSeatClick={onSeatClickHandler}
              editMode={false}
            />
            <section>
              <div className={styles.cart}>
                <h3>Ausgewählte Tickets</h3>
                <h5 className="mt-3">Gesamtpreis: {totalPrice} € </h5>
                <Button
                  disabled={selectedTickets?.length <= 0}
                  onClick={() => console.log(selectedTickets)}
                  className="mb-3"
                >
                  Zur Kasse gehen
                </Button>
                {selectedTickets?.length > 0 ? selectedTicketsElements : <h6 className="text-muted">Keine Tickets ausgewählt</h6>}
              </div>
            </section>
          </div>
        </Content>
      </Container>
    </>
  );
};

export default Ticketshop;
