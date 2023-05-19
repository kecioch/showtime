import { useEffect, useState } from "react";
import Container from "../components/ui/Container";
import Content from "../components/ui/Content";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import LoginForm from "../components/authentication/forms/LoginForm";
import styles from "./Cart.module.css";
import { isEmailValid } from "../services/EmailValidation";
import useAuth from "../hooks/useAuth";
import PaymentModal from "../components/modals/PaymentModal";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import MainButton from "../components/ui/MainButton";
import { CashCoin } from "react-bootstrap-icons";
import useFlash from "../hooks/useFlash";

const Cart = (props) => {
  const [cart, setCart] = useState();
  const [tab, setTab] = useState("login");
  const [totalPrice, setTotalPrice] = useState(0);
  const [guestFirstName, setGuestFirstName] = useState("");
  const [guestLastName, setGuestLastName] = useState("");
  const [guestMail, setGuestMail] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const { login, isLoggedIn, user } = useAuth();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [loadingPage, setLoadingPage] = useState(true);
  const { createMessage } = useFlash();

  useEffect(() => {
    setLoadingPage(true);
    const cart = JSON.parse(localStorage.getItem("cart"));
    setCart(cart);
    const total = cart
      ? cart.tickets?.reduce((acc, seat) => acc + seat.type.price, 0)
      : 0;
    setTotalPrice(total);
    setLoadingPage(false);
  }, []);

  const isPaymentDisabled =
    (!isLoggedIn && tab === "login") ||
    (tab === "guest" &&
      (guestFirstName.length <= 0 ||
        guestLastName.length <= 0 ||
        guestMail.length <= 0 ||
        !isEmailValid(guestMail)));

  const loginSubmitHandler = async (user) => {
    setError();
    setIsFetching(true);
    await login(user.username, user.password).then((success) => {
      setIsFetching(false);
      if (!success) {
        setError("Login fehlgeschlagen");
        return;
      } else {
        createMessage({
          text: "Erfolgreich eingeloggt",
          variant: "success",
        });
      }
    });
  };

  const paymentHandler = () => {
    const customer = isLoggedIn
      ? { name: `${user.firstName} ${user.lastName}`, email: user.email }
      : { name: `${guestFirstName} ${guestLastName}`, email: guestMail };
    setCart((oldCart) => ({ ...oldCart, customer }));
    setShowPaymentModal(true);
  };

  const loginForm = (
    <LoginForm
      isLoading={isFetching}
      error={error}
      onSubmit={loginSubmitHandler}
    />
  );

  const guestForm = (
    <Form className="pt-3">
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
        <Content className={styles.container}>
          {loadingPage && <LoadingSpinner />}
          {!loadingPage && (
            <>
              <h1 className={styles.title}>Warenkorb</h1>
              {cart ? (
                <>
                  <section className={styles.header}>
                    <Image
                      src={
                        cart.screening.scheduledScreening.movie.media.images
                          .poster
                      }
                      className={styles.poster}
                    />
                    <div className={styles.headerInfo}>
                      <h2>{cart.screening.scheduledScreening.movie.title}</h2>
                      <h3 className="mt-3">
                        {cart.screening.scheduledScreening.cinema.title}
                      </h3>
                      <h4 className="mt-1">
                        {new Date(cart.screening.date).toLocaleString("de-de", {
                          weekday: "long",
                        })}
                      </h4>
                      <h4>
                        {new Date(cart.screening.date).toLocaleDateString()},{" "}
                        {cart.screening.scheduledScreening.time} Uhr
                      </h4>
                      <h4 className="mt-1">
                        Ticketanzahl:{" "}
                        {cart.tickets.reduce((acc, ticket) => acc + 1, 0)}
                      </h4>
                    </div>
                  </section>

                  <section className="mt-4 d-flex flex-column align-items-center">
                    {!isLoggedIn && (
                      <div className={styles.customer}>
                        <Nav
                          className={styles.navTabs}
                          variant="tabs"
                          defaultActiveKey="login"
                          onSelect={(key) => setTab(key)}
                        >
                          <Nav.Item>
                            <Nav.Link
                              eventKey="login"
                              className={`${styles.link} ${
                                tab === "login" && styles.activeLink
                              }`}
                            >
                              Login
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link
                              eventKey="guest"
                              className={`${styles.link} ${
                                tab === "guest" && styles.activeLink
                              }`}
                            >
                              Gast
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>
                        <div className={styles.content}>
                          {tab === "login" && loginForm}
                          {tab === "guest" && guestForm}
                        </div>
                      </div>
                    )}
                    <hr className="w-100" />
                    <section className={styles.footer}>
                      <h3 className="mt-3 mb-3 w-100">
                        Gesamtpreis: {totalPrice}€
                      </h3>
                      <MainButton
                        className={styles.payBtn}
                        disabled={isPaymentDisabled}
                        onClick={paymentHandler}
                      >
                        <CashCoin />
                        Bezahlen
                      </MainButton>
                    </section>
                  </section>
                </>
              ) : (
                <h3 className="text-muted text-center mt-3 mb-3">
                  Warenkorb ist leer
                </h3>
              )}
            </>
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
