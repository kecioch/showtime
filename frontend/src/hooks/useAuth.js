import { useContext, useEffect } from "react";
import { BACKEND_URL } from "../constants";
import { AuthContext } from "../contexts/AuthContext";

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);
  //   const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isLoggedIn = user ? true : false;

  const login = async (username, password) => {
    return fetch(`${BACKEND_URL}/authentication/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    })
      .then(async (res) => {
        if (res.status !== 200) return false;
        console.log("LOGIN SUCCESSFULL");
        const data = await res.json();
        saveUser(data.user);
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };

  const logout = () => {
    console.log("LOGOUT");
    fetch(`${BACKEND_URL}/authentication/logout`, {
      method: "POST",
      credentials: "include",
    }).then((res) => {
      if (res.status === 200) removeUser();
    });
  };

  const register = async (user) => {
    return fetch(`${BACKEND_URL}/authentication/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      credentials: "include"
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.status === 200) {
          console.log("REGISTER SUCCESSFULL");
          saveUser(data.user);
        }
        return data;
      })
      .catch((err) => {
        console.log(err);
        return { status: 500, message: err };
      });
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
  }, []);

  return { login, logout, register, isLoggedIn, user, saveUser };
};

export default useAuth;
