import { useEffect } from "react";
import Card from "react-bootstrap/Card";

const Content = (props) => {
  return <div className="mt-4" style={{ width: "80vw" }}>{props.children}</div>;
};

export default Content;
