import { useCallback, useEffect, useState } from "react";
import Container from "../../components/ui/Container";
import Content from "../../components/ui/Content";
import { QrReader } from "react-qr-reader";
import styles from "./TicketValidation.module.css";
import TicketValidationModal from "../../components/modals/TicketValidationModal";
import { BACKEND_URL } from "../../constants";

const TicketValidation = (props) => {
  const [ticket, setTicket] = useState();
  const [code, setCode] = useState();
  const [showValidationModal, setShowValidationModal] = useState(false);

  useEffect(() => {
    console.log("CODE CHANGED");
    fetchTicket(code);
    setCode(null);
  }, [code]);

  const fetchTicket = (code) => {
    if (!code || showValidationModal) return;
    console.log("FETCH TICKET");

    setShowValidationModal(true);
    fetch(`${BACKEND_URL}/tickets/validate/${code}`).then(async (res) => {
      if (res.status !== 200) return;
      const data = await res.json();
      const ticket = {
        id: data._id,
        customer: data.customer,
        seats: data.seats,
        checked: data.checked,
        datetime: data.datetime,
        movie: data.screening.scheduledScreening.movie.title,
        cinema: data.screening.scheduledScreening.cinema.title,
      };
      setTicket(ticket);
    });
  };

  const onScan = (result, error) => {
    if (!!result) {
      console.log("SCANNED");
      const codeTxt = result?.text;
      if (!codeTxt) return;
      setCode(codeTxt);
    }

    if (!!error) {
      console.info(error);
    }
  };

  return (
    <>
      <Container>
        <Content>
          <h1>Ticket Validierung</h1>
          <QrReader
            onResult={onScan.bind(showValidationModal)}
            constraints={{ facingMode: "environment" }}
            className={styles.qrReader}
          />
        </Content>
      </Container>
      <TicketValidationModal
        show={showValidationModal}
        ticket={ticket}
        onClose={() => setShowValidationModal(false)}
      />
    </>
  );
};

export default TicketValidation;
