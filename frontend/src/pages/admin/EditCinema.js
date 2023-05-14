import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Container from "../../components/ui/Container";
import Content from "../../components/ui/Content";
import CinemaConfig from "../../components/cinemas/forms/CinemaConfig";
import { BACKEND_URL } from "../../constants";
import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const EditCinema = (props) => {
  const { id } = useParams();
  const [cinema, setCinema] = useState();
  const navigate = useNavigate();
  const { fetch, isFetching, errorMsg } = useFetch();
  const { fetch: fetchPage, isFetching: isFetchingPage } = useFetch();

  useEffect(() => {
    const fetchMovie = async () => {
      console.log(BACKEND_URL);
      try {
        const res = await fetchPage.get(`${BACKEND_URL}/cinemas/${id}`);
        console.log(res);
        if (res.status !== 200) navigate("/cinemas");
        else setCinema(res.data);
      } catch (err) {
        console.log("ERROR", err);
      }
    };
    fetchMovie();
  }, []);

  const updateCinemaHandler = async (updatedCinema) => {
    console.log("PUT", updatedCinema);
    fetch
      .put(`${BACKEND_URL}/cinemas/${cinema.title}`, updatedCinema)
      .then((res) => console.log(res));
  };

  return (
    <Container>
      <Content>
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
