import { useEffect, useState } from "react";
import Container from "../components/ui/Container";
import Content from "../components/ui/Content";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import { getTimeString } from "../services/FormatDate";
import LoginForm from "../components/authentication/forms/LoginForm";
import styles from "./Cart.module.css";

const Cart = (props) => {
  const [cart, setCart] = useState();
  const [tab, setTab] = useState("login");
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    setCart(cart);
    console.log("CART", cart);
    const total = cart
      ? cart.tickets?.reduce((acc, seat) => acc + seat.type.price, 0)
      : 0;
    setTotalPrice(total);
  }, []);

  const loginForm = <LoginForm />;

  const guestForm = (
    <Form className="mt-3">
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Vorname</Form.Label>
        <Form.Control type="text" placeholder="Vorname eingeben..." />
      </Form.Group>
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Nachname</Form.Label>
        <Form.Control type="text" placeholder="Nachname eingeben..." />
      </Form.Group>
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>E-Mail</Form.Label>
        <Form.Control type="mail" placeholder="E-Mail eingeben..." />
      </Form.Group>
    </Form>
  );

  return (
    <Container>
      <Content>
        <h1>Warenkorb</h1>
        {cart ? (
          <>
            <section className={styles.header}>
              <Image
                src={
                  cart.screening.scheduledScreening.movie.media.images.poster
                }
                className={styles.poster}
              />
              <div>
                <h2 className="mt-4">
                  {cart.screening.scheduledScreening.movie.title}
                </h2>
                <h3 className="mt-4">
                  {cart.screening.scheduledScreening.cinema.title}
                </h3>
                <h4 className="mt-3">
                  {new Date(cart.screening.date).toLocaleString("de-de", {
                    weekday: "long",
                  })}
                </h4>
                <h4>
                  {new Date(cart.screening.date).toLocaleDateString()},{" "}
                  {getTimeString(
                    new Date(cart.screening.scheduledScreening.time)
                  )}{" "}
                  Uhr
                </h4>
                <h4 className="mt-3">
                  Ticketanzahl:{" "}
                  {cart.tickets.reduce((acc, ticket) => acc + 1, 0)}
                </h4>
              </div>
            </section>

            <section className="mt-4">
              <Nav
                variant="tabs"
                defaultActiveKey="login"
                onSelect={(key) => setTab(key)}
              >
                <Nav.Item>
                  <Nav.Link eventKey="login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="guest">Gast</Nav.Link>
                </Nav.Item>
              </Nav>
              {tab === "login" && loginForm}
              {tab === "guest" && guestForm}
              <hr />
              <h3 className="mt-3 mb-3">Gesamtpreis: {totalPrice}€</h3>
              <Button style={{ width: "100%" }}>Bezahlen</Button>
            </section>
          </>
        ): <h3 className="text-muted text-center">Warenkorb ist leer</h3>}
      </Content>
    </Container>
  );
};

export default Cart;
