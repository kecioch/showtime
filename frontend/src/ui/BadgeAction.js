import Badge from "react-bootstrap/Badge";
import {X} from "react-bootstrap-icons";

const BadgeAction = props => {
    const deleteable = props.isDeleteable; 
    return (
        <Badge bg={props.bg}>
            {props.children}
            {deleteable && <span onClick={() => props.onDelete(props.id)}><X size={15}></X></span>}
        </Badge>
    );
};

export default BadgeAction;