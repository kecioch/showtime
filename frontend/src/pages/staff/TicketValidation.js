import { useEffect, useState } from "react";
import Container from "../../components/ui/Container";
import Content from "../../components/ui/Content";
import { QrReader } from "react-qr-reader";
import styles from "./TicketValidation.module.css";
import TicketValidationModal from "../../components/modals/TicketValidationModal";
import { BACKEND_URL } from "../../constants";
import useFetch from "../../hooks/useFetch";

const TicketValidation = (props) => {
  const [ticket, setTicket] = useState();
  const [code, setCode] = useState();
  const [showValidationModal, setShowValidationModal] = useState(false);
  const { fetch } = useFetch();

  useEffect(() => {
    fetchTicket(code);
    setCode(null);
  }, [code]);

  const fetchTicket = (code) => {
    if (!code || showValidationModal) return;

    fetch.get(`${BACKEND_URL}/tickets/validate/${code}`).then((res) => {
      if (res.status !== 200) return;
      const ticket = {
        id: res.data._id,
        customer: res.data.customer,
        seats: res.data.seats,
        checked: res.data.checked,
        datetime: res.data.datetime,
        movie: res.data.screening.scheduledScreening.movie.title,
        cinema: res.data.screening.scheduledScreening.cinema.title,
      };
      setTicket(ticket);
      setShowValidationModal(true);
    });
  };

  const onScan = (result, error) => {
    if (!!result) {
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
        <Content style={{ minHeight: "70vh" }}>
          <h1>Ticket Validierung</h1>
          <hr />
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
