import { useEffect, useState } from "react";
import Container from "../components/ui/Container";
import Content from "../components/ui/Content";
import { BACKEND_URL } from "../constants";
import { useNavigate, useParams } from "react-router-dom";
import Badge from "react-bootstrap/esm/Badge";
import Image from "react-bootstrap/esm/Image";
import styles from "./Ticketshop.module.css";
import { getDateString, getTimeString } from "../services/FormatDate";

const Ticketshop = (props) => {
  const { id } = useParams();
  const [screening, setScreening] = useState();
  const navigate = useNavigate();

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
      })
      .catch((err) => navigate("/"));
  }, []);

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
                  <h3>
                    {new Date(screening.date).toLocaleDateString()},{" "}
                    {getTimeString(new Date(screening.scheduledScreening.time))}{" "}
                    Uhr
                  </h3>
                </div>
              </div>
            </section>
          )}
        </Content>
      </Container>
      <Container>
        <Content>
          <h2>Ticket Auswahl</h2>
        </Content>
      </Container>
    </>
  );
};

export default Ticketshop;
