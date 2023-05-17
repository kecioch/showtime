import { useState } from "react";
import useFlash from "./useFlash";
import useUser from "./useUser";

const useFetch = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const { createMessage } = useFlash();
  const { removeUser } = useUser();

  const clearErrorMsg = () => setErrorMsg();

  const request = async (url, options) => {
    setIsFetching(true);
    setErrorMsg();
    let rtn;
    let res;
    try {
      res = await fetch(url, options);
      const data = await res.json();
      if (res.status !== 200) setErrorMsg(data.message);
      if (res.status === 401 && data?.tokenExpired) {
        removeUser();
        createMessage({
          header: "Sitzung abgelaufen",
          text: "Bitte erneut einloggen",
          variant: "danger",
        });
      }
      rtn = { status: res.status, ...data };
    } catch (err) {
      rtn = {
        status: res?.status || 400,
        message: res?.status !== 200 && "Fehler bei der Serveranfrage",
      };
      res?.status !== 200 && setErrorMsg("Fehler bei der Serveranfrage");
    }
    setIsFetching(false);
    return rtn;
  };

  const get = async (url) => {
    const res = await request(url, {
      method: "GET",
      credentials: "include",
    });
    return res;
  };

  const post = async (url, body) => {
    const res = await request(url, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return res;
  };

  const put = async (url, body) => {
    const res = await request(url, {
      method: "PUT",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return res;
  };

  const patch = async (url, body) => {
    const res = await request(url, {
      method: "PATCH",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return res;
  };

  const deleteRq = async (url, body) => {
    const res = await request(url, {
      method: "DELETE",
      credentials: "include",
    });
    return res;
  };

  const fetchRequest = {
    get,
    post,
    put,
    patch,
    delete: deleteRq,
  };

  return { fetch: fetchRequest, isFetching, errorMsg, clearErrorMsg };
};

export default useFetch;
