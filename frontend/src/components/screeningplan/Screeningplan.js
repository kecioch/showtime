import { DAYS_OF_WEEK } from "../../constants";
import ScreeningItem from "./ScreeningItem";
import styles from "./Screeningplan.module.css";

const Screeningplan = (props) => {
  const cinemas = props.cinemas;
  const screenings = props.screenings;

  const content = [];

  cinemas.forEach((cinema, i) => {
    // Cinema header title
    content.push(
      <tr key={cinema.title}>
        <th colSpan={7} className="text-center bg-secondary">{cinema.title}</th>
      </tr>
    );

    // Items for weekdays
    const itemsWeek = [];
    DAYS_OF_WEEK.forEach((day) => {
      const items = screenings
        ?.filter(
          (screening) =>
            screening.cinema.title === cinema.title && screening.weekday === day
        )
        .map((el, i) => (
          <ScreeningItem
            key={el.movie.title + i}
            title={el.movie.title}
            time={el.time}
          />
        ));

      itemsWeek.push(<td key={cinema.title + "_items"}>{items}</td>);
    });
    content.push(<tr>{itemsWeek}</tr>);
  });

  return (
    <table className={styles.screeningPlan}>
      <thead>
        <tr>
          <th>Mo</th>
          <th>Di</th>
          <th>Mi</th>
          <th>Do</th>
          <th>Fr</th>
          <th>Sa</th>
          <th>So</th>
        </tr>
      </thead>
      <tbody>{content}</tbody>
    </table>
  );
};

export default Screeningplan;
