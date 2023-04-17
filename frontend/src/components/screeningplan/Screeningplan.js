import { DAYS_OF_WEEK } from "../../constants";
import ScreeningItem from "./ScreeningItem";
import styles from "./Screeningplan.module.css";
import HorizontalScrollContainer from "../ui/HorizontalScrollContainer";
import { useEffect, useState } from "react";

const Screeningplan = (props) => {
  const cinemas = props.cinemas;
  const screenings = props.screenings;
  const [content, setContent] = useState([]);

  useEffect(() => {
    const tableContent = [];

    cinemas.forEach((cinema, i) => {
      // Cinema header title
      tableContent.push(
        <tr key={cinema.title}>
          <th colSpan={7} className="text-center bg-secondary">
            {cinema.title}
          </th>
        </tr>
      );

      // Items for weekdays
      const itemsWeek = [];
      DAYS_OF_WEEK.forEach((day) => {
        const items = screenings
          ?.filter(
            (screening) =>
              screening.cinema.title === cinema.title &&
              screening.weekday === day
          )
          .sort((elA, elB) => new Date(elA.time) - new Date(elB.time))
          .map((el, i) => {
            const timeDate = new Date(el.time);
            return <ScreeningItem
              key={`${el.cinema.title}_${el.movie.title}_${el.weekday}_${el.time}_${i}`}
              title={el.movie.title}
              time={`${timeDate.getHours()}:${timeDate.getMinutes()}`}
              id={el._id}
              onDelete={props.onDelete}
            />
      });

        itemsWeek.push(
          <td key={`${cinema.title}_${day}_items`}>
            <div className={styles.items}>{items}</div>
          </td>
        );
      });
      tableContent.push(<tr key={cinema.title + "_week"}>{itemsWeek}</tr>);
    });

    setContent(tableContent);
  }, [cinemas, screenings]);

  return (
    <HorizontalScrollContainer>
      <table className={styles.screeningPlan}>
        <thead>
          <tr className={styles.weekdays}>
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
    </HorizontalScrollContainer>
  );
};

export default Screeningplan;
