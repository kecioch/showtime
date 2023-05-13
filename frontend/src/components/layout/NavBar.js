import { Container, Nav, Navbar } from "react-bootstrap";
import { ROLES } from "../../constants";
import useAuth from "../../hooks/useAuth";
import styles from "./NavBar.module.css";
import NavLink from "../ui/NavLink";

const NavBar = () => {
  const { isLoggedIn, logout, user } = useAuth();

  return (
    <Navbar
      collapseOnSelect
      expand="md"
      bg="dark"
      variant="dark"
      sticky="top"
      className={styles.navBar}
    >
      <Container>
        <Navbar.Brand className={styles.brand}>Showtime</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className={`me-auto ${styles.navLinks}`}>
            <NavLink to="/">Home</NavLink>
            {isLoggedIn && <NavLink to="/dashboard">Dashboard</NavLink>}
            {user && user.role === ROLES.USER && (
              <NavLink to="/user/tickets">Meine Tickets</NavLink>
            )}
            {user &&
              (user.role === ROLES.ADMIN || user.role === ROLES.STAFF) && (
                <NavLink to="/tickets/validation">Ticket Scanner</NavLink>
              )}
          </Nav>
          <Nav className={styles.navAccount}>
            {isLoggedIn ? (
              <NavLink onClick={() => logout()}>Ausloggen</NavLink>
            ) : (
              <NavLink to="/login">Einloggen</NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
