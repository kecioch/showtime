import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const useUser = () => {
  const { user, setUser } = useContext(UserContext);

  const saveUser = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const removeUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return { user, setUser, saveUser, removeUser };
};

export default useUser;
