import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ROLES } from "../../constants";
import useAuth from "../../hooks/useAuth";

const NavBar = () => {
  const { isLoggedIn, logout, user } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" sticky="top" className="navbar">
      <Container>
        <Navbar.Brand>Showtime</Navbar.Brand>
        <Nav className="me-auto d-flex gap-3">
          <Link to="/">Home</Link>
          {isLoggedIn && <Link to="/dashboard">Dashboard</Link>}
          {user && user.role === ROLES.USER && (
            <Link to="/user/tickets">Meine Tickets</Link>
          )}
          {user && (user.role === ROLES.ADMIN || user.role === ROLES.STAFF) && (
            <Link to="/validation">Ticket Scanner</Link>
          )}
        </Nav>
        <Nav>
          {isLoggedIn ? (
            <Link onClick={() => logout()}>Ausloggen</Link>
          ) : (
            <Link to="/login">Einloggen</Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
