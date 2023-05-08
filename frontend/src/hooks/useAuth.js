import { useContext, useEffect } from "react";
import { BACKEND_URL } from "../constants";
import { AuthContext } from "../contexts/AuthContext";
import useFetch from "./useFetch";

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);
  const { fetch } = useFetch();

  const isLoggedIn = user ? true : false;

  const login = async (username, password) => {
    return fetch
      .post(`${BACKEND_URL}/authentication/login`, { username, password })
      .then(async (res) => {
        console.log("RES LOGIN", res);
        if (res.status !== 200) return false;
        console.log("LOGIN SUCCESSFULL");
        saveUser(res.user);
        return true;
      });
  };

  const logout = () => {
    console.log("LOGOUT");
    fetch.post(`${BACKEND_URL}/authentication/logout`).then((res) => {
      if (res.status === 200) removeUser();
    });
  };

  const register = async (user) => {
    const res = await fetch.post(
      `${BACKEND_URL}/authentication/register`,
      user
    );

    if (res.status === 200) {
      console.log("REGISTER SUCCESSFULL");
      saveUser(res.user);
    }

    return res;
  };

  const saveUser = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const removeUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    try {
      const loadedUser = JSON.parse(localStorage.getItem("user"));
      console.log("USER LOADED", loadedUser);
      if (loadedUser) setUser(loadedUser);
    } catch (err) {
      console.log(err);
    }
  }, [setUser]);

  return { login, logout, register, isLoggedIn, user, saveUser };
};

export default useAuth;
