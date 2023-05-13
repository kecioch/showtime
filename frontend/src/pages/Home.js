import styles from "./Home.module.css";
import ProgramPlan from "../components/programplan/ProgramPlan";
import Container from "../components/ui/Container";
import Content from "../components/ui/Content";
import { Image } from "react-bootstrap";

const Home = (props) => {
  return (
    <Container>
      {/* <div style={{background: "red", width: "100%"}}>Test</div> */}
      <Content>
        <h1>Programmplan</h1>
        <ProgramPlan />
      </Content>
    </Container>
  );
};

export default Home;
