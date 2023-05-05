import { useEffect, useState } from "react";
import Container from "../../components/ui/Container";
import Content from "../../components/ui/Content";
import { BACKEND_URL } from "../../constants";
import TicketList from "../../components/tickets/TicketList";
import useAuth from "../../hooks/useAuth";

const Tickets = (props) => {
  const [tickets, setTickets] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    console.log(user);
    fetch(`${BACKEND_URL}/tickets`, {
      credentials: "include"
    }).then(async (res) => {
      if (res.status !== 200) return;
      const data = await res.json();
      console.log("TICKETS", data);
      setTickets(
        data.map((ticket, i) => ({
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
      );
    });
  }, [user]);

  return (
    <Container>
      <Content>
        <h1 className="mb-4">Meine Tickets</h1>
        <hr />
        <TicketList tickets={tickets} />
      </Content>
    </Container>
  );
};

export default Tickets;
