import { useEffect, useState } from "react";
import StaffList from "../../components/staff/StaffList";
import Container from "../../components/ui/Container";
import Content from "../../components/ui/Content";
import Button from "react-bootstrap/Button";
import { BACKEND_URL } from "../../constants";
import StaffModal from "../../components/modals/StaffModal";
import DeleteModal from "../../components/modals/DeleteModal";
import useFetch from "../../hooks/useFetch";

const Staff = (props) => {
  const [staff, setStaff] = useState([]);
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteStaff, setDeleteStaff] = useState();
  const { fetch, isFetching, errorMsg, clearErrorMsg } = useFetch();

  useEffect(() => {
    fetch.get(`${BACKEND_URL}/users/staff`).then((res) => {
      if (res.status !== 200) return;
      setStaff(res.data);
      console.log("STAFF DATA", res.data);
    });
  }, []);

  const onDelete = (staff) => {
    console.log("DELETE STAFF", staff);
    setDeleteStaff(staff);
    clearErrorMsg();
    setShowDeleteModal(true);
  };

  const onAdd = () => {
    clearErrorMsg();
    setShowStaffModal(true);
  };

  const deleteHandler = () => {
    console.log("DELETE HANDLER", deleteStaff);
    fetch.delete(`${BACKEND_URL}/users/staff/${deleteStaff.id}`).then((res) => {
      if (res.status !== 200) return;
      setStaff((prevStaff) => [
        ...prevStaff.filter((staff) => staff.id !== deleteStaff.id),
      ]);
      setShowDeleteModal(false);
    });
  };

  const createStaffHandler = (staff) => {
    console.log("CREATE STAFF HANDLER", staff);
    fetch.post(`${BACKEND_URL}/users/staff`, staff).then((res) => {
      if (res.status !== 200) return;
      setStaff((prevStaff) => [...prevStaff, res.data]);
      setShowStaffModal(false);
    });
  };

  return (
    <>
      <Container>
        <Content>
          <h1>Mitarbeiter verwalten</h1>
          <hr />
          <Button onClick={onAdd}>Hinzufügen</Button>
          <StaffList data={staff} onDelete={onDelete} />
        </Content>
      </Container>
      <StaffModal
        show={showStaffModal}
        isNew={true}
        onClose={() => setShowStaffModal(false)}
        onSubmit={createStaffHandler}
        isLoading={isFetching}
        error={errorMsg}
      />
      <DeleteModal
        show={showDeleteModal}
        title="Mitarbeiter löschen"
        text="Wollen Sie wirklich den Mitarbeiter löschen?"
        onClose={() => setShowDeleteModal(false)}
        onDelete={deleteHandler}
        error={errorMsg}
        isLoading={isFetching}
      />
    </>
  );
};

export default Staff;
