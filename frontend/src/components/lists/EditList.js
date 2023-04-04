import EditListItem from "../lists/EditListItem";

const EditList = (props) => {
  const items = props.data;

  const listItems = items.map((el, i) => (
    <EditListItem key={i} data={el} onDelete={props.onDelete} />
  ));

  return <div className="d-flex flex-column gap-2">{listItems}</div>;
};

export default EditList;
