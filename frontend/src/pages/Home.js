import Header from "../components/home/Header";
import ProgramPlan from "../components/programplan/ProgramPlan";
import Container from "../components/ui/Container";
import Content from "../components/ui/Content";

const Home = (props) => {
  return (
    <>
      <Container style={{minHeight: "80vh"}}>
        <Header />
        <Content>
          <h1>Programmplan</h1>
          <ProgramPlan />
        </Content>
      </Container>
    </>
  );
};

export default Home;
