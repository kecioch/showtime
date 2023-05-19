import { FlashContext } from "../contexts/FlashContext";
import { useContext } from "react";

const useFlash = () => {
  const { message, setMessage, timerID } = useContext(FlashContext);
  const defaultDelay = 4000;

  const createMessage = (msg) => {
    if (message) clearMessage();
    if (!msg.autoHideOff && !msg.delay) msg.delay = defaultDelay;

    setMessage(msg);
    const delay = msg?.delay || defaultDelay;
    if (!msg.autoHideOff)
      timerID.current = setTimeout(() => clearMessage(), delay);
  };

  const getMessage = () => {
    return message;
  };

  const clearMessage = () => {
    clearTimeout(timerID);
    setMessage(null);
  };

  return { getMessage, createMessage, clearMessage };
};

export default useFlash;
