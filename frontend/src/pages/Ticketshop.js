import { useEffect, useState } from "react";
import Container from "../components/ui/Container";
import Content from "../components/ui/Content";
import { BACKEND_URL } from "../constants";
import { useNavigate, useParams } from "react-router-dom";
import Image from "react-bootstrap/esm/Image";
import styles from "./Ticketshop.module.css";
import { getTimeString } from "../services/FormatDate";
import SeatMap from "../components/seatmap/SeatMap";
import useFetch from "../hooks/useFetch";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import MainButton from "../components/ui/MainButton";
import AgeBadge from "../components/movies/AgeBadge";
import { Cart4 } from "react-bootstrap-icons";
import { AnimatePresence, motion } from "framer-motion";

const Ticketshop = (props) => {
  const { id } = useParams();
  const [screening, setScreening] = useState();
  const navigate = useNavigate();
  const [seatMap, setSeatMap] = useState();
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { fetch, isFetching } = useFetch();

  useEffect(() => {
    // Fetching screening data
    fetch
      .get(`${BACKEND_URL}/screenings/ticketshop/${id}`)
      .then((res) => {
        if (res.status !== 200) navigate("/");
        return res.data;
      })
      .then((data) => {
        // Fetching seattypes
        fetch.get(`${BACKEND_URL}/seattypes`).then((res) => {
          if (res.status !== 200) navigate("/");

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
              const matchingSeatType = res.data.find(
                (seatType) => seatType._id === seat.type
              );

              // replace the string with the SeatType object
              if (matchingSeatType) {
                seat.type = matchingSeatType;
              }
            }
          }

          // Set booked seats
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
    const cart = {
      screening,
      tickets: selectedTickets,
    };
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
    setTotalPrice(
      selectedTickets?.reduce((acc, seat) => acc + seat.type.price, 0)
    );
  }, [selectedTickets]);

  const selectedTicketsElements = (
    <motion.ul className={styles.cartList}>
      <AnimatePresence>
        {selectedTickets?.map((seat, i) => {
          return (
            <motion.li
              key={i}
              layout
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
            >{`1x Reihe: ${seat.row}, Platz: ${seat.col} (${seat.type.title})`}</motion.li>
          );
        })}
      </AnimatePresence>
    </motion.ul>
  );

  return (
    <>
      {" "}
      {!isFetching && (
        <Container>
          <Content>
            {screening && (
              <section>
                <div className={styles.headerInfo}>
                  <Image
                    src={screening.scheduledScreening.movie.media.images.poster}
                    className={styles.poster}
                  />

                  <div>
                    <h1>{screening.scheduledScreening.movie.title}</h1>
                    <p>
                      <AgeBadge>
                        {
                          screening.scheduledScreening.movie.release
                            .ageRestriction
                        }
                      </AgeBadge>{" "}
                      •{" "}
                      {
                        screening.scheduledScreening.movie.release
                          .productionYear
                      }{" "}
                      (
                      {
                        screening.scheduledScreening.movie.release
                          .productionCountry
                      }
                      ) • {screening.scheduledScreening.movie.genres.join(", ")}{" "}
                      • {screening.scheduledScreening.movie.runtime}min
                    </p>
                    <h2 className={styles.cinemaTitle}>
                      {screening.scheduledScreening.cinema.title}
                    </h2>
                    <h4 className="mt-3">
                      {new Date(screening.date).toLocaleString("de-de", {
                        weekday: "long",
                      })}
                    </h4>
                    <h4>
                      {new Date(screening.date).toLocaleDateString()},{" "}
                      {screening.scheduledScreening.time} Uhr
                    </h4>
                  </div>
                </div>
              </section>
            )}
          </Content>
        </Container>
      )}
      <Container>
        <Content>
          {isFetching && <LoadingSpinner />}
          {!isFetching && (
            <>
              <h2>Ticket Auswahl</h2>
              <div className={styles.ticketSelection}>
                <SeatMap
                  data={seatMap}
                  onSeatClick={onSeatClickHandler}
                  editMode={false}
                  className={styles.seatMap}
                />

                <div className={styles.cart}>
                  <h3>Ausgewählte Tickets</h3>
                  <h5 className="mt-3">Gesamtpreis: {totalPrice} € </h5>
                  <MainButton
                    disabled={selectedTickets?.length <= 0}
                    onClick={goToCartHandler}
                    className="mb-3"
                  >
                    <Cart4 />
                    Zur Kasse gehen
                  </MainButton>
                  {selectedTickets?.length > 0 ? (
                    selectedTicketsElements
                  ) : (
                    <h6 className="text-muted">Keine Tickets ausgewählt</h6>
                  )}
                </div>
              </div>
            </>
          )}
        </Content>
      </Container>
    </>
  );
};

export default Ticketshop;
