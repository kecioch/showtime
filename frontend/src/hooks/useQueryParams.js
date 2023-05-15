import { useLocation, useNavigate } from "react-router-dom";

const useQueryParams = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const setParameter = (param, value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(param, value);
    navigate(`?${searchParams.toString()}`);
  };

  const getParameter = (param) => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get(param);
  };

  const deleteParameter = (param) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete(param);
    navigate(`?${searchParams.toString()}`);
  };

  return { setParameter, getParameter, deleteParameter };
};

export default useQueryParams;
