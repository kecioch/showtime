import CheckboxDropDown from "../ui/CheckboxDropDown";
import styles from "./ProgramPlanFilter.module.css";
import { Form } from "react-bootstrap";

const ProgramPlanFilter = ({
  timeOptions,
  ageOptions,
  genreOptions,
  setTimeFilter,
  setGenreFilter,
  setFskFilter,
}) => {
  const onSelectTime = (time) => {
    setTimeFilter(time);
  };

  const onSelectGenre = (genres) => {
    setGenreFilter(genres);
  };

  const onSelectFsk = (fsk) => {
    setFskFilter(fsk.map((el) => el));
  };

  return (
    <div className={styles.container}>
      <Form.Select
        aria-label="Zeit aussuchen"
        className={styles.select}
        defaultValue={timeOptions?.default}
        onChange={(ev) => onSelectTime(ev.target.value)}
      >
        {timeOptions?.options?.map((opt, i) => (
          <option key={i} value={opt.value}>
            {opt.text}
          </option>
        ))}
      </Form.Select>
      <CheckboxDropDown data={genreOptions} onChange={onSelectGenre}>
        Genres
      </CheckboxDropDown>
      <CheckboxDropDown data={ageOptions} onChange={onSelectFsk}>
        FSK
      </CheckboxDropDown>
    </div>
  );
};

export default ProgramPlanFilter;
