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

const Ticketshop = (props) => {
  const { id } = useParams();
  const [screening, setScreening] = useState();
  const navigate = useNavigate();
  const [seatMap, setSeatMap] = useState();

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
  }, []);

  const onSeatClickHandler = (seat) => {
    console.log("SEATCLICKED", seat);
  };

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
                  <h4 className="mt-3">{new Date(screening.date).toLocaleString('de-de', {weekday:'long'})}</h4>
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
              <h3>Ausgewählte Tickets</h3>
              <p>asd</p>
            </section>
          </div>
        </Content>
      </Container>
    </>
  );
};

export default Ticketshop;
