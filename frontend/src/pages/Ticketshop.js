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
    // Fetching screening data
    fetch(`${BACKEND_URL}/screenings/ticketshop/${id}`)
      .then((res) => {
        if (res.status !== 200) navigate("/");
        return res.json();
      })
      .then((data) => {
        // Fetching seattypes
        fetch(`${BACKEND_URL}/seattypes`)
          .then((res) => res.json())
          .then((types) => {
            console.log("TYPES", types);
            console.log("DATA", data);

            // Replace seattypes in data with actual seattype objects
            for (
              let i = 0;
              i < data.scheduledScreening.cinema.map.rows.length;
              i++
            ) {
              const row = data.scheduledScreening.cinema.map.rows[i];

              // loop through each seat in the row
              for (let j = 0; j < row.length; j++) {
                const seat = row[j];

                // find the SeatType object with the matching id
                const matchingSeatType = types.find(
                  (seatType) => seatType._id === seat.type
                );

                // replace the string with the SeatType object
                if (matchingSeatType) {
                  seat.type = matchingSeatType;
                }
              }
            }

            // Set booked seats
            console.log("BOOKED", data.bookedSeats);
            for (
              let i = 0;
              i < data.scheduledScreening.cinema.map.rows.length;
              i++
            ) {
              const row = data.scheduledScreening.cinema.map.rows[i];
              for (let j = 0; j < row.length; j++) {
                const mapSeat = row[j];
                for (var k = 0; k < data.bookedSeats.length; k++) {
                  var bookedSeat = data.bookedSeats[k];
                  if (
                    mapSeat.col === bookedSeat.col &&
                    mapSeat.row === bookedSeat.row
                  ) {
                    mapSeat.status = "booked";
                  }
                }
              }
            }

            setScreening(data);
            setSeatMap(data.scheduledScreening.cinema);
          });
      })
      .catch((err) => navigate("/"));
  }, [id, navigate]);

  const onSeatClickHandler = (seat) => {
    if (!seat || !seat?.type || seat?.status === "booked") return;
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

  const goToCartHandler = () => {
    console.log(screening);
    const cart = {
      screening,
      tickets: selectedTickets,
    };
    // console.log(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/cart");
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
    setTotalPrice(
      selectedTickets?.reduce((acc, seat) => acc + seat.type.price, 0)
    );
  }, [selectedTickets]);

  const selectedTicketsElements = (
    <ul className={styles.cartList}>
      {selectedTickets?.map((seat, i) => {
        console.log("SEAT", seat);
        return (
          <li
            key={i}
          >{`1x Reihe: ${seat.row}, Platz: ${seat.col} (${seat.type.title})`}</li>
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
                  onClick={goToCartHandler}
                  className="mb-3"
                >
                  Zur Kasse gehen
                </Button>
                {selectedTickets?.length > 0 ? (
                  selectedTicketsElements
                ) : (
                  <h6 className="text-muted">Keine Tickets ausgewählt</h6>
                )}
              </div>
            </section>
          </div>
        </Content>
      </Container>
    </>
  );
};

export default Ticketshop;
