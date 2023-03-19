import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import ProgramPlan from "../components/programplan/ProgramPlan";
import Container from "../ui/Container";

const Home = (props) => {
  return (
    <Container>
      <ProgramPlan />
    </Container>
  );
};

export default Home;
