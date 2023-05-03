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

  useEffect(() => {
    fetch(`${BACKEND_URL}/seattypes`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTypes(data);
      });
  }, []);

  const addSeatType = () => {
    setIsNew(true);
    setShowSeatTypeModal(true);
  };

  const deleteSeatType = (selected) => {
    setSelectedSeatType(selected);
    setShowDeleteModal(true);
  };

  const editSeatType = (selected) => {
    setIsNew(false);
    setSelectedSeatType(selected);
    setShowSeatTypeModal(true);
  };

  const submitHandler = (type) => {
    console.log("SUBMIT", type);
    if(isNew) {
        console.log("NEW");
    } else {
        console.log("UPDATE");
        
    }
  };

  const deleteHandler = () => {
    console.log("DELETE SEAT TYPE", selectedSeatType);
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
      />
      <DeleteModal
        show={showDeleteModal}
        title={selectedSeatType?.title}
        text="Wollen Sie wirklich den Sitzplatz-Typ löschen?"
        onClose={() => setShowDeleteModal(false)}
        onDelete={deleteHandler}
      />
    </>
  );
};

export default SeatTypes;
