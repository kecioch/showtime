import Container from "../../components/ui/Container";
import Content from "../../components/ui/Content";
import Button from "react-bootstrap/esm/Button";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../constants";
import Screeningplan from "../../components/screeningplan/Screeningplan";
import DeleteModal from "../../components/modals/DeleteModal";
import useFetch from "../../hooks/useFetch";
import ScreeningModal from "../../components/modals/ScreeningModal";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import styles from "./EditScreenings.module.css";
import MainButton from "../../components/ui/MainButton";

const EditScreenings = (props) => {
  const [cinemas, setCinemas] = useState([]);
  const [movies, setMovies] = useState([]);
  const [screenings, setScreenings] = useState([]);
  const [showNewScreeningModal, setShowNewScreeningModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteScreening, setDeleteScreening] = useState();

  const { fetch, isFetching, errorMsg, clearErrorMsg } = useFetch();
  const [isPageLoading, setIsPageLoading] = useState(true);

  const addScreeningHandler = (newScreening) => {
    const movie = movies.find((m) => m.title === newScreening.movie);
    const cinema = cinemas.find((c) => c.title === newScreening.cinema);

    const screening = {
      ...newScreening,
      movie,
      cinema,
    };
    console.log("ADDSCREENING", screening);

    fetch.post(`${BACKEND_URL}/screenings/schedule`, screening).then((res) => {
      console.log("POST RESULT DATA", res);
      if (res.status !== 200) return;
      setScreenings((screenings) => [...screenings, res.data]);
    });
  };

  const deleteScreeningHandler = () => {
    console.log("DELETE SCREENING", deleteScreening);
    fetch
      .delete(`${BACKEND_URL}/screenings/schedule/${deleteScreening}`)
      .then((res) => {
        console.log(res);
        if (res.status !== 200) return;
        setShowDeleteModal(false);
        setScreenings((prev) => {
          const screenings = prev.filter((el) => el._id !== deleteScreening);
          return screenings;
        });
      });
  };

  const onDeleteScreening = (screeningID) => {
    setDeleteScreening(screeningID);
    console.log("SCREENINGID", screeningID);
    clearErrorMsg();
    setShowDeleteModal(true);
  };

  useEffect(() => {
    const fetchPage = async () => {
      setIsPageLoading(true);
      await fetch.get(`${BACKEND_URL}/screenings/schedule`).then((res) => {
        if (res.status !== 200) return;
        console.log("FETCH SCREENINGS", res);
        setScreenings(res.data);
      });

      await fetch.get(`${BACKEND_URL}/movies`).then((res) => {
        if (res.status !== 200) return;
        console.log("FETCH MOVIES", res.data);
        setMovies(res.data);
      });

      await fetch.get(`${BACKEND_URL}/cinemas`).then((res) => {
        if (res.status !== 200) return;
        console.log("FETCH CINEMAS", res.data);
        setCinemas(res.data);
      });
      setIsPageLoading(false);
    };
    fetchPage();
  }, []);

  const openNewScreening = () => {
    clearErrorMsg();
    setShowNewScreeningModal(true);
  };

  return (
    <>
      <Container>
        <Content className={styles.content}>
          <div className={styles.header}>
            <h1>Filmvorführungen</h1>
            <hr />
            <MainButton className="mb-3" onClick={openNewScreening}>
              Hinzufügen
            </MainButton>
          </div>
          {isPageLoading && <LoadingSpinner />}
          {!isPageLoading && (
            <>
              {screenings?.length > 0 ? (
                <Screeningplan
                  cinemas={cinemas}
                  screenings={screenings}
                  onDelete={onDeleteScreening}
                  editMode={true}
                />
              ) : (
                <h2 className="text-muted text-center">
                  Keine Filmvorführungen vorhanden
                </h2>
              )}
            </>
          )}
        </Content>
      </Container>
      <ScreeningModal
        show={showNewScreeningModal}
        options={{ movies, cinemas }}
        onClose={() => setShowNewScreeningModal(false)}
        isLoading={isFetching}
        error={errorMsg}
        onSubmit={addScreeningHandler}
      />
      <DeleteModal
        show={showDeleteModal}
        title="Filmvorführung"
        text="Wollen Sie wirklich die Filmvorführung löschen?"
        onClose={() => setShowDeleteModal(false)}
        onDelete={deleteScreeningHandler}
        isLoading={isFetching}
        error={errorMsg}
      />
    </>
  );
};

export default EditScreenings;
