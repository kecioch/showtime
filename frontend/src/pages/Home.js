import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import ProgramPlan from "../components/programplan/ProgramPlan";
import Container from "../components/ui/Container";
import Content from "../components/ui/Content";
import Button from "react-bootstrap/Button";

const Home = (props) => {
  return (
    <Container>
      <Content>
        <div className="d-flex gap-2">
          <Link to="/movies">
            <Button className="mb-4" variant="primary">
              Film Verwaltung
            </Button>
          </Link>
          <Link to="/cinemas">
            <Button className="mb-4" variant="primary">
              Kinosaal Verwaltung
            </Button>
          </Link>
          <Link to="/screenings/edit">
            <Button className="mb-4" variant="primary">
              Vorführungen Verwaltung
            </Button>
          </Link>
          <Link to="/validation">
            <Button className="mb-4" variant="primary">
              Ticket Scanner
            </Button>
          </Link>
        </div>
        <ProgramPlan />
      </Content>
    </Container>
  );
};

export default Home;
