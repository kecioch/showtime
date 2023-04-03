import logo from "./logo.svg";
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
        <Route path="/movies/new" element={<NewMovie />} />
        <Route path="/movies/:id" element={<Movie />} />
        <Route path="/cinemas/new" element={<NewCinema />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
