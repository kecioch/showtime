import "./App.css";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import NewMovie from "./pages/admin/NewMovie";
import NewCinema from "./pages/admin/NewCinema";
import { Route, Routes, Link } from "react-router-dom";
import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Cinema from "./pages/Cinema";
import Cinemas from "./pages/admin/Cinemas";
import Movies from "./pages/admin/Movies";
import EditMovie from "./pages/admin/EditMovie";
import EditCinema from "./pages/admin/EditCinema";
import EditScreenings from "./pages/admin/EditScreenings";
import Ticketshop from "./pages/Ticketshop";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import useAuth from "./hooks/useAuth";
import ProtectedRoute from "./routes/ProtectedRoute";
import Completion from "./pages/payment/Completion";
import TicketValidation from "./pages/staff/TicketValidation";
import Tickets from "./pages/user/Tickets";
import SeatTypes from "./pages/admin/SeatTypes";
import { ROLES } from "./constants";
import Dashboard from "./pages/user/Dashboard";

function App() {
  const { isLoggedIn, logout, user } = useAuth();
  return (
    <React.Fragment>
      <Navbar bg="dark" variant="dark" sticky="top" className="navbar">
        <Container>
          <Navbar.Brand>Showtime</Navbar.Brand>
          <Nav className="me-auto d-flex gap-3">
            <Link to="/">Home</Link>
            {isLoggedIn && <Link to="/dashboard">Dashboard</Link>}
            {user && user.role === ROLES.USER && (
              <Link to="/user/tickets">Meine Tickets</Link>
            )}
            {user &&
              (user.role === ROLES.ADMIN || user.role === ROLES.STAFF) && (
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route
          element={
            <ProtectedRoute
              hasPermission={isLoggedIn && user.role === ROLES.ADMIN}
            />
          }
        >
          <Route path="/movies" element={<Movies />} />
        </Route>
        <Route path="/movies/new" element={<NewMovie />} />
        <Route path="/movies/:id" element={<Movie />} />
        <Route path="/movies/:id/edit" element={<EditMovie />} />
        <Route path="/cinemas" element={<Cinemas />} />
        <Route path="/cinemas/new" element={<NewCinema />} />
        <Route path="/cinemas/:id" element={<Cinema />} />
        <Route path="/cinemas/:id/edit" element={<EditCinema />} />
        <Route path="/screenings/edit" element={<EditScreenings />} />
        <Route path="/ticketshop/:id" element={<Ticketshop />} />
        <Route path="/ticketshop/payment/completion" element={<Completion />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/validation" element={<TicketValidation />} />
        <Route path="/user/tickets" element={<Tickets />} />
        <Route path="/seattypes" element={<SeatTypes />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
