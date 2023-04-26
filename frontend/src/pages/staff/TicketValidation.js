import { useState } from "react";
import Container from "../../components/ui/Container";
import Content from "../../components/ui/Content";
import { QrReader } from "react-qr-reader";

const TicketValidation = (props) => {
  const [data, setData] = useState("");
  return (
    <Container>
      <Content>
        <h1>Ticket Validierung</h1>
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              console.log("SCANNED");
              setData(result?.text);
            }

            if (!!error) {
              console.info(error);
            }
          }}
          style={{ width: "100%" }}
        />
        <p>{data}</p>
      </Content>
    </Container>
  );
};

export default TicketValidation;
