import { useState } from "react";
import { EyeFill, EyeSlashFill, KeyFill } from "react-bootstrap-icons";
import { InputGroup, Form } from "react-bootstrap";

const PasswordInput = ({
  className,
  onChange,
  placeholder,
  value,
  required,
  icon,
}) => {
  const [hide, setHide] = useState(true);

  const toggleHide = () => {
    setHide((prev) => !prev);
  };

  return (
    <InputGroup>
      {icon && (
        <InputGroup.Text id="inputPassword">
          <KeyFill />
        </InputGroup.Text>
      )}
      <Form.Control
        type={hide ? "password" : "text"}
        placeholder={placeholder}
        className={className}
        onChange={onChange}
        value={value}
        required={required}
      />
      <InputGroup.Text onClick={toggleHide}>
        {hide ? <EyeFill /> : <EyeSlashFill />}
      </InputGroup.Text>
    </InputGroup>
  );
};

export default PasswordInput;
