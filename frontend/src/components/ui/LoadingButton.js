import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

const LoadingButton = (props) => {
  const { isLoading, children } = props;
  const loadingMsg = (
    <div className="d-flex align-items-center justify-content-center gap-1">
      <span>Bitte warten</span>
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
    </div>
  );
  const content = isLoading ? loadingMsg : children;
  return (
    <Button
      className={props.className}
      variant={props.variant}
      type={props.type}
      onClick={props.onClick}
      disabled={isLoading}
      id={props.id}
    >
      {content}
    </Button>
  );
};

export default LoadingButton;
