import { useEffect, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { Filter } from "react-bootstrap-icons";
import styles from "./CheckboxDropDown.module.css";

const CheckboxDropDown = ({ children, data, onChange }) => {
  const [values, setValues] = useState({});

  const handleChange = (key, val) => {
    setValues((prevVal) => {
      const newVal = { ...prevVal };
      newVal[key] = val;
      return { ...newVal };
    });

    const selection = [];
    const newValues = { ...values };
    newValues[key] = val;
    for (const [key, value] of Object.entries(newValues)) {
      if (value) selection.push(key);
    }
    onChange(selection);
  };

  useEffect(() => {
    const initValues = {};
    data.forEach((item) => {
      if (item.checked) initValues[item.value] = true;
    });
    setValues(initValues);
  },[]);

  return (
    <Dropdown className={styles.dropdown}>
      <Dropdown.Toggle>
        <Filter /> {children}
      </Dropdown.Toggle>
      <Dropdown.Menu className={styles.menu}>
        {data.map((item, i) => (
          <Form.Check
            key={i}
            type="checkbox"
            id={item.value}
            label={item.value}
            defaultChecked={item.checked}
            onChange={(ev) => handleChange(item.value, ev.target.checked)}
          />
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CheckboxDropDown;
