import Container from "react-bootstrap/esm/Container";
import Content from "../../ui/Content";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Cinemas = (props) => {
  return (
    <Container>
      <Content>
        <h1>Kinosaal Verwaltung</h1>
        <hr />
        <Link to="/cinemas/new">
          <Button className="mb-4" variant="primary">
            Neu
          </Button>
        </Link>
      </Content>
    </Container>
  );
};

export default Cinemas;
