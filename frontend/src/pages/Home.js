import styles from "./Home.module.css";
import ProgramPlan from "../components/programplan/ProgramPlan";
import Container from "../components/ui/Container";
import Content from "../components/ui/Content";

const Home = (props) => {
  return (
    <Container>
      <Content>
        <ProgramPlan />
      </Content>
    </Container>
  );
};

export default Home;
