import Container from "../../components/ui/Container";
import Content from "../../components/ui/Content";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../constants";
import EditList from "../../components/lists/EditList";
import DeleteModal from "../../components/modals/DeleteModal";
import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const Cinemas = (props) => {
  const [cinemas, setCinemas] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteCinema, setDeleteCinema] = useState();
  const { fetch, isFetching, errorMsg, clearErrorMsg } = useFetch();
  const { fetch: fetchPage, isFetching: isFetchingPage } = useFetch();

  useEffect(() => {
    fetchPage
      .get(`${BACKEND_URL}/cinemas`)
      .then((res) => {
        console.log(res);
        const cinemaItems = res.data.map((el) => ({
          title: el.title,
          editPath: `/admin/cinemas/${el.title}/edit`,
        }));
        return cinemaItems;
      })
      .then((cinemaItems) => {
        const cinemaItemsSorted = cinemaItems.sort((cinemaA, cinemaB) =>
          cinemaA.title.localeCompare(cinemaB.title)
        );
        setCinemas(cinemaItemsSorted);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteCinemaHandler = () => {
    console.log("DELETE", deleteCinema);
    fetch.delete(`${BACKEND_URL}/cinemas/${deleteCinema.title}`).then((res) => {
      console.log(res);
      if (res.status !== 200) return;
      setShowDeleteModal(false);
      setCinemas((prev) => {
        const cinemas = prev.filter((el) => el.title !== deleteCinema.title);
        return cinemas;
      });
    });
  };

  const onDeleteCinema = (cinema) => {
    setDeleteCinema(cinema);
    clearErrorMsg();
    setShowDeleteModal(true);
  };

  return (
    <>
      <Container>
        <Content>
          <h1>Kinosaal Verwaltung</h1>
          <hr />
          <Link to="/admin/cinemas/new">
            <Button className="mb-4" variant="primary">
              Neu
            </Button>
          </Link>
          {isFetchingPage && <LoadingSpinner />}
          {!isFetchingPage && (
            <>
              {cinemas.length > 0 && (
                <EditList data={cinemas} onDelete={onDeleteCinema} />
              )}
              {cinemas.length <= 0 && (
                <h2 className="text-muted text-center">
                  Keine Kinosäle vorhanden
                </h2>
              )}
            </>
          )}
        </Content>
      </Container>
      <DeleteModal
        show={showDeleteModal}
        title={deleteCinema?.title}
        text="Wollen Sie wirklich den Kinosaal löschen?"
        onClose={() => setShowDeleteModal(false)}
        onDelete={deleteCinemaHandler}
        isLoading={isFetching}
        error={errorMsg}
      />
    </>
  );
};

export default Cinemas;
