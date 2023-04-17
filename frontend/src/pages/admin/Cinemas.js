import Container from "../../components/ui/Container";
import Content from "../../components/ui/Content";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../constants";
import EditList from "../../components/lists/EditList";
import DeleteModal from "../../components/modals/DeleteModal";

const Cinemas = (props) => {
  const [cinemas, setCinemas] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteCinema, setDeleteCinema] = useState();

  useEffect(() => {
    fetch(`${BACKEND_URL}/cinemas`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const cinemaItems = data.map((el) => ({
          title: el.title,
          editPath: `/cinemas/${el.title}/edit`,
        }));
        return cinemaItems;
      })
      .then((cinemaItems) => {
        const cinemaItemsSorted = cinemaItems.sort(
          (cinemaA, cinemaB) => cinemaA.title.localeCompare(cinemaB.title)
        );
        setCinemas(cinemaItemsSorted);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteCinemaHandler = () => {
    console.log("DELETE", deleteCinema);
    fetch(`${BACKEND_URL}/cinemas/${deleteCinema.title}`, {
      method: "DELETE",
    }).then((res) => {
      console.log(res);
      setShowDeleteModal(false);
      setCinemas((prev) => {
        const cinemas = prev.filter((el) => el.title !== deleteCinema.title);
        return cinemas;
      });
    });
  };

  const onDeleteCinema = (cinema) => {
    setDeleteCinema(cinema);
    setShowDeleteModal(true);
  };

  return (
    <>
      <Container>
        <Content>
          <h1>Kinosaal Verwaltung</h1>
          <hr />
          <Link to="/cinemas/new">
            <Button className="mb-4" variant="primary">
              Neu
            </Button>
          </Link>
          {cinemas.length > 0 && (
            <EditList data={cinemas} onDelete={onDeleteCinema} />
          )}
          {cinemas.length <= 0 && (
            <h2 className="text-muted text-center">Keine Kinosäle vorhanden</h2>
          )}
        </Content>
      </Container>
      <DeleteModal
        show={showDeleteModal}
        title={deleteCinema?.title}
        text="Wollen Sie wirklich den Kinosaal löschen?"
        onClose={() => setShowDeleteModal(false)}
        onDelete={deleteCinemaHandler}
      />
    </>
  );
};

export default Cinemas;
