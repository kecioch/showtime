import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Container from "../../components/ui/Container";
import Content from "../../components/ui/Content";
import CinemaConfig from "../../components/cinemas/forms/CinemaConfig";
import { BACKEND_URL } from "../../constants";
import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import useFlash from "../../hooks/useFlash";

const EditCinema = (props) => {
  const { id } = useParams();
  const [cinema, setCinema] = useState();
  const navigate = useNavigate();
  const { fetch, isFetching, errorMsg } = useFetch();
  const { fetch: fetchPage, isFetching: isFetchingPage } = useFetch();
  const { createMessage } = useFlash();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetchPage.get(`${BACKEND_URL}/cinemas/${id}`);
        if (res.status !== 200) navigate("/cinemas");
        else setCinema(res.data);
      } catch (err) {
        console.log("ERROR", err);
      }
    };
    fetchMovie();
  }, []);

  const updateCinemaHandler = async (updatedCinema) => {
    fetch
      .put(`${BACKEND_URL}/cinemas/${cinema.title}`, updatedCinema)
      .then((res) => {
        if (res.status === 200)
          createMessage({
            text: "Kinosaal wurde erfolgreich aktualisiert",
            variant: "success",
          });
      });
  };

  return (
    <Container>
      <Content style={{ minHeight: "70vh" }}>
        <h1 className="mb-4">Kinosaal bearbeiten</h1>
        {isFetchingPage && <LoadingSpinner />}
        {!isFetchingPage && (
          <CinemaConfig
            cinema={cinema}
            onSubmit={updateCinemaHandler}
            isNew={false}
            isLoading={isFetching}
            error={errorMsg}
          />
        )}
      </Content>
    </Container>
  );
};

export default EditCinema;
