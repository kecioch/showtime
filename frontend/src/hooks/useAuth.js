import { useContext, useEffect, useState } from "react";
import { BACKEND_URL } from "../constants";
import jwtDecode from "jwt-decode";
import { AuthContext } from "../contexts/AuthContext";

const useAuth = () => {
  const { token, setToken, user, setUser } = useContext(AuthContext);
  //   const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isLoggedIn = token ? true : false;

  const login = async (username, password) => {
    return fetch(`${BACKEND_URL}/authentication/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          console.log("LOGIN SUCCESSFULL");
          //   setIsLoggedIn(true);
          saveToken(data.token);
          return true;
        }
        return false;
      })
      .catch((err) => {
        console.log(err)
        return false;
    });
  };

  const logout = () => {
    console.log("LOGOUT");
    removeToken();
  };

  const register = async (user) => {
    return fetch(`${BACKEND_URL}/authentication/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("REGISTER TRY",data);
        if (data.status === 200) {
          console.log("REGISTER SUCCESSFULL");
          saveToken(data.token);
        }
        console.log("BAD")
        return data;
      })
      .catch((err) => {
        console.log(err);
        return {status: 500, message: err};
      });
  };

  const saveToken = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const removeToken = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const loadedToken = localStorage.getItem("token");
    console.log("TOKEN LOADED", loadedToken);
    if (loadedToken) setToken(loadedToken);
  }, []);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("DECODED TOKEN", decodedToken);
        setUser(decodedToken.user);
        //   setIsLoggedIn(true);
      } catch (error) {
        console.log("REMOVING TOKEN");
        removeToken();
      }
    } else {
      setUser(null);
      //   setIsLoggedIn(false);
    }
  }, [token]);

  return { login, logout, register, isLoggedIn, user, token };
};

export default useAuth;
