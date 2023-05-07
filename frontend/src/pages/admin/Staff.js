import { useEffect, useState } from "react";
import StaffList from "../../components/staff/StaffList";
import Container from "../../components/ui/Container";
import Content from "../../components/ui/Content";
import Button from "react-bootstrap/Button";
import { BACKEND_URL } from "../../constants";
import StaffModal from "../../components/modals/StaffModal";
import DeleteModal from "../../components/modals/DeleteModal";
import { Eyeglasses } from "react-bootstrap-icons";

const Staff = (props) => {
  const [staff, setStaff] = useState([]);
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [deleteStaff, setDeleteStaff] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    fetch(`${BACKEND_URL}/users/staff`, {
      credentials: "include",
    }).then(async (res) => {
      if (res.status !== 200) return;
      const data = await res.json();
      setStaff(data);
      console.log("STAFF DATA", data);
    });
  }, []);

  const onDelete = (staff) => {
    console.log("DELETE STAFF", staff);
    setDeleteStaff(staff);
    setDeleteModal(true);
  };

  const deleteHandler = async () => {
    console.log("DELETE HANDLER", deleteStaff);
    setIsFetching(true);
    try {
      fetch(`${BACKEND_URL}/users/staff/${deleteStaff.id}`, {
        method: "DELETE",
        credentials: "include",
      }).then((res) => {
        if (res.status === 200) {
          setStaff((prevStaff) => [
            ...prevStaff.filter((staff) => staff.id !== deleteStaff.id),
          ]);
          setDeleteModal(false);
        }
      });
    } catch (err) {
      console.log(err);
    }
    setIsFetching(false);
  };

  const createStaffHandler = (staff) => {
    console.log("CREATE STAFF HANDLER", staff);
    setIsFetching(true);
    try {
      fetch(`${BACKEND_URL}/users/staff`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(staff),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then(async (res) => {
        const data = await res.json();
        if (res.status !== 200) {
          setError(data.message);
        } else {
          setStaff((prevStaff) => [...prevStaff, data]);
          setShowStaffModal(false);
        }
      });
    } catch (err) {
      console.log(err);
    }
    setIsFetching(false);
  };

  return (
    <>
      <Container>
        <Content>
          <h1>Mitarbeiter verwalten</h1>
          <hr />
          <Button onClick={() => setShowStaffModal(true)}>Hinzufügen</Button>
          <StaffList data={staff} onDelete={onDelete} />
        </Content>
      </Container>
      <StaffModal
        show={showStaffModal}
        isNew={true}
        onClose={() => setShowStaffModal(false)}
        onSubmit={createStaffHandler}
        isLoading={isFetching}
        error={error}
      />
      <DeleteModal
        show={showDeleteModal}
        title="Mitarbeiter löschen"
        text="Wollen Sie wirklich den Mitarbeiter löschen?"
        onClose={() => setDeleteModal(false)}
        onDelete={deleteHandler}
        isLoading={isFetching}
      />
    </>
  );
};

export default Staff;
