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

function App() {
  return (
    <React.Fragment>
      <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand>
            Showtime
          </Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/">Home</Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/new" element={<NewMovie />} />
        <Route path="/movies/:id" element={<Movie />} />
        <Route path="/movies/:id/edit" element={<EditMovie />} />
        <Route path="/cinemas" element={<Cinemas />} />
        <Route path="/cinemas/new" element={<NewCinema />} />
        <Route path="/cinemas/:id" element={<Cinema />} />
        <Route path="/cinemas/:id/edit" element={<EditCinema />} />
        <Route path="/screenings/edit" element={<EditScreenings />} />
        <Route path="/ticketshop/:id" element={<Ticketshop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
