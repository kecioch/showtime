import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import ProgramPlan from "../components/programplan/ProgramPlan";
import Container from "../ui/Container";
import Content from "../ui/Content";
import Button from "react-bootstrap/Button";

const Home = (props) => {
  return (
    <Container>
      <Content>
        <div className="d-flex gap-2">
          <Link to="/movies/new">
            <Button className="mb-4" variant="primary">
              Neuen Film hinzufügen
            </Button>
          </Link>
          <Link to="/cinemas">
            <Button className="mb-4" variant="primary">
              Kinosaal Verwaltung
            </Button>
          </Link>
        </div>
        <ProgramPlan />
      </Content>
    </Container>
  );
};

export default Home;
