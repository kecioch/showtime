import React, { useRef, useState } from "react";

const FlashContext = React.createContext();

const FlashContextProvider = ({ children }) => {
  const [message, setMessage] = useState();
  const timerID = useRef();

  return (
    <FlashContext.Provider value={{ message, setMessage, timerID }}>
      {children}
    </FlashContext.Provider>
  );
};

export { FlashContext, FlashContextProvider };
