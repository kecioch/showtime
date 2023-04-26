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
import { isEmailValid } from "../services/EmailValidation";
import useAuth from "../hooks/useAuth";
import Modal from "react-bootstrap/Modal";
import Payment from "../components/payment/forms/Payment";
import PaymentModal from "../components/modals/PaymentModal";

const Cart = (props) => {
  const [cart, setCart] = useState();
  const [tab, setTab] = useState("login");
  const [totalPrice, setTotalPrice] = useState(0);
  const [guestFirstName, setGuestFirstName] = useState("");
  const [guestLastName, setGuestLastName] = useState("");
  const [guestMail, setGuestMail] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const { login, isLoggedIn, user } = useAuth();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    setCart(cart);
    console.log("CART", cart);
    const total = cart
      ? cart.tickets?.reduce((acc, seat) => acc + seat.type.price, 0)
      : 0;
    setTotalPrice(total);
  }, []);

  const isPaymentDisabled =
    (!isLoggedIn && tab === "login") ||
    (tab === "guest" &&
      (guestFirstName.length <= 0 ||
        guestLastName.length <= 0 ||
        guestMail.length <= 0 ||
        !isEmailValid(guestMail)));

  const loginSubmitHandler = async (user) => {
    await login(user.username, user.password).then((success) => {
      console.log("LOGIN SUCCESS ?", success);
      if (!success) return;
    });
  };

  const paymentHandler = () => {
    console.log("CART", cart);
    const customer = isLoggedIn
      ? { name: `${user.firstName} ${user.lastName}`, email: user.email }
      : { name: `${guestFirstName} ${guestLastName}`, email: guestMail };
    console.log("CUSTOMER", customer);
    setCart((oldCart) => ({ ...oldCart, customer }));
    setShowPaymentModal(true);
  };

  const loginForm = <LoginForm onSubmit={loginSubmitHandler} />;

  const guestForm = (
    <Form className="mt-3">
      <Form.Group className="mb-3" controlId="guestFirstName">
        <Form.Label>Vorname</Form.Label>
        <Form.Control
          type="text"
          placeholder="Vorname eingeben..."
          onChange={(ev) => setGuestFirstName(ev.target.value)}
          value={guestFirstName}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="guestLastName">
        <Form.Label>Nachname</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nachname eingeben..."
          onChange={(ev) => setGuestLastName(ev.target.value)}
          value={guestLastName}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="guestEmail">
        <Form.Label>E-Mail</Form.Label>
        <Form.Control
          type="email"
          placeholder="E-Mail eingeben..."
          onChange={(ev) => setGuestMail(ev.target.value)}
          value={guestMail}
        />
      </Form.Group>
    </Form>
  );

  return (
    <>
      {" "}
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
                {!isLoggedIn && (
                  <div>
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
                  </div>
                )}
                <hr />
                <h3 className="mt-3 mb-3">Gesamtpreis: {totalPrice}€</h3>
                <Button
                  className={styles.payBtn}
                  disabled={isPaymentDisabled}
                  onClick={paymentHandler}
                >
                  Bezahlen
                </Button>
              </section>
            </>
          ) : (
            <h3 className="text-muted text-center">Warenkorb ist leer</h3>
          )}
        </Content>
      </Container>
      <PaymentModal
        show={showPaymentModal}
        cart={cart}
        onClose={() => setShowPaymentModal(false)}
      />
    </>
  );
};

export default Cart;
