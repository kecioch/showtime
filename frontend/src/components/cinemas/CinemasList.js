import CinemaListItem from "./CinemaListItem";

const CinemasList = (props) => {
  const cinemas = props.data;

  const listItems = cinemas.map((el, i) => (
    <CinemaListItem key={i} data={el} onDelete={props.onDelete} />
  ));

  return <div className="d-flex flex-column gap-2">{listItems}</div>;
};

export default CinemasList;
