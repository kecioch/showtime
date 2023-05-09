import { useEffect, useState } from "react";
import Container from "../../components/ui/Container";
import Content from "../../components/ui/Content";
import Button from "react-bootstrap/Button";
import { BACKEND_URL } from "../../constants";
import SeatTypesList from "../../components/seattypes/SeatTypesList";
import SeatTypeModal from "../../components/modals/SeatTypeModal";
import DeleteModal from "../../components/modals/DeleteModal";
import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const SeatTypes = (props) => {
  const [types, setTypes] = useState([]);
  const [showSeatTypeModal, setShowSeatTypeModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSeatType, setSelectedSeatType] = useState();
  const [isNew, setIsNew] = useState(true);
  const { fetch, isFetching, errorMsg, clearErrorMsg } = useFetch();
  const { fetch: fetchPage, isFetching: isFetchingPage } = useFetch();

  useEffect(() => {
    fetchPage.get(`${BACKEND_URL}/seattypes`).then(async (res) => {
      console.log(res);
      if (res.status !== 200) return;
      setTypes(res.data.sort((elA, elB) => elA.title.localeCompare(elB.title)));
    });
  }, []);

  const addSeatType = () => {
    clearErrorMsg();
    setSelectedSeatType();
    setIsNew(true);
    setShowSeatTypeModal(true);
  };

  const deleteSeatType = (selected) => {
    clearErrorMsg();
    setSelectedSeatType(selected);
    setShowDeleteModal(true);
  };

  const editSeatType = (selected) => {
    clearErrorMsg();
    setIsNew(false);
    setSelectedSeatType(selected);
    setShowSeatTypeModal(true);
  };

  const submitHandler = async (type) => {
    console.log("SUBMIT", type);
    try {
      if (isNew) {
        console.log("NEW", type);
        const res = await fetch.post(`${BACKEND_URL}/seattypes`, type);
        if (res.status !== 200) return;

        setTypes((prevTypes) =>
          [...prevTypes, res.data].sort((elA, elB) =>
            elA.title.localeCompare(elB.title)
          )
        );
        setShowSeatTypeModal(false);
      } else {
        console.log("UPDATE");
        const res = await fetch.put(
          `${BACKEND_URL}/seattypes/${type._id}`,
          type
        );
        if (res.status !== 200) return;

        setTypes((prevTypes) =>
          [
            ...prevTypes.filter((prevType) => prevType._id !== type._id),
            type,
          ].sort((elA, elB) => elA.title.localeCompare(elB.title))
        );
        setShowSeatTypeModal(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteHandler = async () => {
    console.log("DELETE SEAT TYPE", selectedSeatType);
    try {
      const res = await fetch.delete(
        `${BACKEND_URL}/seattypes/${selectedSeatType._id}`
      );
      if (res.status !== 200) return;
      setShowDeleteModal(false);
      setTypes((prevTypes) => [
        ...prevTypes.filter((type) => type._id !== selectedSeatType._id),
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Container>
        <Content>
          <h1>Sitzplatz-Typen</h1>
          <hr />
          <Button className="mb-4" variant="primary" onClick={addSeatType}>
            Neu
          </Button>
          {isFetchingPage && <LoadingSpinner />}
          {!isFetchingPage && (
            <>
              {types.length > 0 && (
                <SeatTypesList
                  data={types}
                  onDelete={deleteSeatType}
                  onEdit={editSeatType}
                />
              )}
              {types.length <= 0 && (
                <h2 className="text-muted text-center">
                  Keine Sitzplatz-Typen vorhanden
                </h2>
              )}
            </>
          )}
        </Content>
      </Container>
      <SeatTypeModal
        show={showSeatTypeModal}
        isNew={isNew}
        onClose={() => setShowSeatTypeModal(false)}
        onSubmit={submitHandler}
        selected={selectedSeatType}
        error={errorMsg}
        isLoading={isFetching}
      />
      <DeleteModal
        show={showDeleteModal}
        title={selectedSeatType?.title}
        text="Wollen Sie wirklich den Sitzplatz-Typ löschen?"
        onClose={() => setShowDeleteModal(false)}
        onDelete={deleteHandler}
        isLoading={isFetching}
        error={errorMsg}
      />
    </>
  );
};

export default SeatTypes;
