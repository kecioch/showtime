import { useEffect, useState } from "react";
import StaffList from "../../components/staff/StaffList";
import Container from "../../components/ui/Container";
import Content from "../../components/ui/Content";
import { BACKEND_URL } from "../../constants";
import StaffModal from "../../components/modals/StaffModal";
import DeleteModal from "../../components/modals/DeleteModal";
import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import MainButton from "../../components/ui/MainButton";
import styles from "./Staff.module.css";
import useFlash from "../../hooks/useFlash";

const Staff = (props) => {
  const [staff, setStaff] = useState([]);
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteStaff, setDeleteStaff] = useState();
  const { fetch, isFetching, errorMsg, clearErrorMsg } = useFetch();
  const { fetch: fetchPage, isFetching: isFetchingPage } = useFetch();
  const { createMessage } = useFlash();

  useEffect(() => {
    fetchPage.get(`${BACKEND_URL}/users/staff`).then((res) => {
      if (res.status !== 200) return;
      setStaff(res.data);
    });
  }, []);

  const onDelete = (staff) => {
    setDeleteStaff(staff);
    clearErrorMsg();
    setShowDeleteModal(true);
  };

  const onAdd = () => {
    clearErrorMsg();
    setShowStaffModal(true);
  };

  const deleteHandler = () => {
    fetch.delete(`${BACKEND_URL}/users/staff/${deleteStaff.id}`).then((res) => {
      if (res.status !== 200) return;
      setStaff((prevStaff) => [
        ...prevStaff.filter((staff) => staff.id !== deleteStaff.id),
      ]);
      setShowDeleteModal(false);
      createMessage({
        text: "Mitarbeiter wurde erfolgreich gelöscht",
        variant: "success",
      });
    });
  };

  const createStaffHandler = (staff) => {
    fetch.post(`${BACKEND_URL}/users/staff`, staff).then((res) => {
      if (res.status !== 200) return;
      setStaff((prevStaff) => [...prevStaff, res.data]);
      setShowStaffModal(false);
      createMessage({
        text: "Mitarbeiter wurde erfolgreich erstellt",
        variant: "success",
      });
    });
  };

  return (
    <>
      <Container>
        <Content className={styles.content} style={{ minHeight: "70vh" }}>
          <div className={styles.header}>
            <h1>Mitarbeiter verwalten</h1>
            <hr />
            <MainButton onClick={onAdd}>Neuen Mitarbeiter erstellen</MainButton>
          </div>
          {isFetchingPage && <LoadingSpinner />}
          {!isFetchingPage && <StaffList data={staff} onDelete={onDelete} />}
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
