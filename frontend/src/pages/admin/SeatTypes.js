import { useEffect, useState } from "react";
import Container from "../../components/ui/Container";
import Content from "../../components/ui/Content";
import Button from "react-bootstrap/Button";
import { BACKEND_URL } from "../../constants";
import SeatTypesList from "../../components/seattypes/SeatTypesList";
import SeatTypeModal from "../../components/modals/SeatTypeModal";
import DeleteModal from "../../components/modals/DeleteModal";

const SeatTypes = (props) => {
  const [types, setTypes] = useState([]);
  const [showSeatTypeModal, setShowSeatTypeModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSeatType, setSelectedSeatType] = useState();
  const [isNew, setIsNew] = useState(true);
  const [error, setError] = useState();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    fetch(`${BACKEND_URL}/seattypes`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTypes(data);
      });
  }, []);

  const addSeatType = () => {
    setError(null);
    setIsNew(true);
    setShowSeatTypeModal(true);
  };

  const deleteSeatType = (selected) => {
    setSelectedSeatType(selected);
    setShowDeleteModal(true);
  };

  const editSeatType = (selected) => {
    setError(null);
    setIsNew(false);
    setSelectedSeatType(selected);
    setShowSeatTypeModal(true);
  };

  const submitHandler = async (type) => {
    setIsFetching(true);
    console.log("SUBMIT", type);
    try {
      if (isNew) {
        console.log("NEW");
        const res = await fetch(`${BACKEND_URL}/seattypes`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(type),
        });
        const data = await res.json();
        if (res.status !== 200) return setError(data.message);

        setTypes((prevTypes) => [...prevTypes, data]);
        setShowSeatTypeModal(false);
      } else {
        console.log("UPDATE");
        const res = await fetch(`${BACKEND_URL}/seattypes/${type._id}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(type),
        });
        const data = await res.json();
        if (res.status !== 200) return setError(data.message);

        setTypes((prevTypes) => [
          ...prevTypes.filter((prevType) => prevType._id !== type._id),
          type,
        ]);
        setShowSeatTypeModal(false);
      }
    } catch (err) {
      console.log(err);
    }
    setIsFetching(false);
  };

  const deleteHandler = async () => {
    console.log("DELETE SEAT TYPE", selectedSeatType);
    setIsFetching(true);
    try {
      const res = await fetch(
        `${BACKEND_URL}/seattypes/${selectedSeatType._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      setShowDeleteModal(false);
      if (res.status !== 200) return;
      setTypes((prevTypes) => [
        ...prevTypes.filter((type) => type._id !== selectedSeatType._id),
      ]);
    } catch (err) {
      console.log(err);
    }
    setIsFetching(false);
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
          <SeatTypesList
            data={types}
            onDelete={deleteSeatType}
            onEdit={editSeatType}
          />
        </Content>
      </Container>
      <SeatTypeModal
        show={showSeatTypeModal}
        isNew={isNew}
        onClose={() => setShowSeatTypeModal(false)}
        onSubmit={submitHandler}
        selected={selectedSeatType}
        error={error}
        isLoading={isFetching}
      />
      <DeleteModal
        show={showDeleteModal}
        title={selectedSeatType?.title}
        text="Wollen Sie wirklich den Sitzplatz-Typ löschen?"
        onClose={() => setShowDeleteModal(false)}
        onDelete={deleteHandler}
        isLoading={isFetching}
      />
    </>
  );
};

export default SeatTypes;
