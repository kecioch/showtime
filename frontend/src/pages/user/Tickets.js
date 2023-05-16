import { useEffect, useState } from "react";
import Container from "../../components/ui/Container";
import Content from "../../components/ui/Content";
import { BACKEND_URL } from "../../constants";
import TicketList from "../../components/tickets/TicketList";
import useAuth from "../../hooks/useAuth";
import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import styles from "./Tickets.module.css";

const Tickets = (props) => {
  const [tickets, setTickets] = useState([]);
  const { user } = useAuth();
  const { fetch, isFetching } = useFetch();

  useEffect(() => {
    if (!user) return;
    fetch.get(`${BACKEND_URL}/tickets`).then(async (res) => {
      if (res.status !== 200) return;
      setTickets(
        res.data
          .map((ticket, i) => ({
            id: ticket._id,
            datetime: ticket.datetime,
            codeSVG: ticket.codeSVG,
            customer: ticket.customer,
            seats: ticket.seats,
            cinema: ticket.screening.scheduledScreening.cinema.title,
            movie: {
              title: ticket.screening.scheduledScreening.movie.title,
              poster:
                ticket.screening.scheduledScreening.movie.media.images.poster,
            },
            checked: ticket.checked,
          }))
          .sort((elA, elB) => new Date(elB.datetime) - new Date(elA.datetime))
      );
    });
  }, [user]);

  return (
    <Container>
      <Content className={styles.content} style={{ minHeight: "70vh" }}>
        <div className={styles.header}>
          <h1 className="mb-4">Meine Tickets</h1>
          <hr />
        </div>
        {isFetching && <LoadingSpinner />}
        {!isFetching && <TicketList tickets={tickets} />}
      </Content>
    </Container>
  );
};

export default Tickets;
