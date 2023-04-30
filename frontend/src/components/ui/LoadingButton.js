import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

const LoadingButton = (props) => {
  const { isLoading, children } = props;
  const loadingMsg = (
    <div className="d-flex align-items-center gap-1">
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
      onClick={props.onClick}
      disabled={isLoading}
    >
      {content}
    </Button>
  );
};

export default LoadingButton;
