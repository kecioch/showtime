import { Navigate, useNavigate, useSearchParams, Link } from "react-router-dom";
import Container from "../../components/ui/Container";
import Content from "../../components/ui/Content";
import { useEffect } from "react";
import styles from "./Completion.module.css";

const Completion = (props) => {
  const [params] = useSearchParams();
  const redirect_status = params.get("redirect_status");
  const payment_intent = params.get("payment_intent");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("cart");
    const timer = setTimeout(() => {
      navigate("/");
    }, 10000);
    return () => clearTimeout(timer);
  }, [navigate]);

  if (!redirect_status || !payment_intent) return <Navigate to="/" />;

  const success = (
    <>
      {" "}
      <h1>Der Bezahlvorgang war erfolgreich!</h1>
      <h2 className="mt-2">Wir sehen uns im Kino 🎬</h2>
      <h3 className="mt-5">Die Tickets wurden an Ihre Email gesendet</h3>
      <h6 className="mt-5">Weiterleitung in 10 Sekunden...</h6>
      <p>
        Sollten Sie nicht weitergeleitet werden,{" "}
        <Link to="/" className={styles.link}>
          klicke hier
        </Link>
      </p>
    </>
  );

  const failure = (
    <>
      <h1>Beim Bezahlvorgang ist ein Fehler aufgetreten</h1>
      <h2>ID: {payment_intent}</h2>
      <h6 className="mt-5">Weiterleitung in 10 Sekunden...</h6>
      <p>
        Sollten Sie nicht weitergeleitet werden,{" "}
        <Link to="/" className={styles.link}>
          klicke hier
        </Link>
      </p>
    </>
  );

  const content = redirect_status === "succeeded" ? success : failure;

  return (
    <Container style={{minHeight: "75vh"}}>
      <Content>{content}</Content>
    </Container>
  );
};

export default Completion;
