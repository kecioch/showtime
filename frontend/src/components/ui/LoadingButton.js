import Button from "react-bootstrap/esm/Button";

const LoadingButton = props => {
    const {isLoading, children} = props;
    const loadingMsg  =  "Bitte warten ...";
    const content  = isLoading ? loadingMsg : children; 
    return (
        <Button className={props.className} variant={props.variant} onClick={props.onClick} disabled={isLoading}>{content}</Button>
    );
};

export default LoadingButton;