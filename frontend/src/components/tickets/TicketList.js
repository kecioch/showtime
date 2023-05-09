import { useState } from "react";
import TicketListItem from "../../components/tickets/TicketListItem";
import TicketModal from "../modals/TicketModal";

const TicketList = (props) => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [ticketDetails, setTicketDetails] = useState();

  const showTicketDetailsHandler = (ticket) => {
    setShowDetailsModal(true);
    setTicketDetails(ticket);
  };

  const ticketItems = props.tickets?.map((ticket, i) => (
    <TicketListItem
      key={i}
      ticket={ticket}
      onClick={showTicketDetailsHandler}
    />
  ));

  const content =
    ticketItems && ticketItems.length > 0 ? (
      ticketItems
    ) : (
      <h2 className="text-muted text-center">Keine Tickets vorhanden</h2>
    );

  return (
    <>
      <div>{content}</div>
      <TicketModal
        show={showDetailsModal}
        ticket={ticketDetails}
        onClose={() => setShowDetailsModal(false)}
      />
    </>
  );
};

export default TicketList;
