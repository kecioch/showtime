import { Navigate, useSearchParams } from "react-router-dom";
import Container from "../../components/ui/Container";
import Content from "../../components/ui/Content";
import { useEffect } from "react";

const Completion = (props) => {
  const [params] = useSearchParams();
  const redirect_status = params.get("redirect_status");
  const payment_intent = params.get("payment_intent");

  if (!redirect_status || !payment_intent) return <Navigate to="/" />;

  const success = (
    <>
      {" "}
      <h1>Der Bezahlvorgang war erfolgreich!</h1>
      <h2>Wir sehen uns im Kino 🎬</h2>
      
    </>
  );

  const failure = (
    <>
      <h1>Beim Bezahlvorgang ist ein Fehler aufgetreten</h1>
      <h2>ID: {payment_intent}</h2>
    </>
  );

  const content = redirect_status === "succeeded" ? success : failure;

  return (
    <Container>
      <Content>{content}</Content>
    </Container>
  );
};

export default Completion;
