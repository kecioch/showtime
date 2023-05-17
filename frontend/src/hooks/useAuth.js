import { useEffect } from "react";
import { BACKEND_URL } from "../constants";
import useFetch from "./useFetch";
import useFlash from "./useFlash";
import useUser from "./useUser";

const useAuth = () => {
  const { fetch } = useFetch();
  const { createMessage } = useFlash();
  const { user, setUser, saveUser, removeUser } = useUser();

  const isLoggedIn = user ? true : false;

  const login = async (username, password) => {
    return fetch
      .post(`${BACKEND_URL}/authentication/login`, { username, password })
      .then(async (res) => {
        if (res.status !== 200) return false;
        saveUser(res.user);
        return true;
      });
  };

  const logout = () => {
    fetch.post(`${BACKEND_URL}/authentication/logout`).then((res) => {
      if (res.status === 200) {
        removeUser();
        createMessage({
          text: "Erfolgreich ausgeloggt",
          variant: "success",
        });
      }
    });
  };

  const register = async (user) => {
    const res = await fetch.post(
      `${BACKEND_URL}/authentication/register`,
      user
    );

    if (res.status === 200) {
      saveUser(res.user);
      createMessage({
        text: "Erfolgreich registriert",
        variant: "success",
      });
    }

    return res;
  };

  useEffect(() => {
    try {
      const loadedUser = JSON.parse(localStorage.getItem("user"));
      if (loadedUser) setUser(loadedUser);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return {
    login,
    logout,
    register,
    isLoggedIn,
    user,
    saveUser,
  };
};

export default useAuth;
