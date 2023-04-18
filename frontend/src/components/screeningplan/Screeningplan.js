import { DAYS_OF_WEEK } from "../../constants";
import ScreeningItem from "./ScreeningItem";
import styles from "./Screeningplan.module.css";
import HorizontalScrollContainer from "../ui/HorizontalScrollContainer";
import { useEffect, useState } from "react";
import { getTimeString } from "../../services/FormatDate";
import { getNextDate } from "../../services/Weekdays";

const Screeningplan = (props) => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    let cinemas = props.cinemas;
    const screenings = props.screenings;
    const editMode = props.editMode;
    const tableContent = [];

    if (!editMode) {
      // cinemas = [...new Set(screenings.map(screening => screening.cinema))]
      cinemas = Array.from(
        new Set(screenings.map((screening) => screening.cinema.title))
      ).map(
        (title) =>
          screenings.find((screening) => screening.cinema.title === title)
            .cinema
      );
      console.log("CINEMAS", cinemas);
    }

    cinemas
      .sort((cinemaA, cinemaB) => cinemaA.title.localeCompare(cinemaB.title))
      .forEach((cinema, i) => {
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
              return editMode ? (
                <ScreeningItem
                  key={`${el.cinema.title}_${el.movie.title}_${el.weekday}_${el.time}_${i}`}
                  title={el.movie.title}
                  time={getTimeString(timeDate)}
                  id={el._id}
                  onDelete={props.onDelete}
                  editMode={true}
                />
              ) : (
                <ScreeningItem
                  key={`${el.cinema.title}_${el.weekday}_${el.time}_${i}`}
                  time={getTimeString(timeDate)}
                  id={el._id}
                  editMode={false}
                />
              );
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
  }, [props.cinemas, props.editMode, props.screenings, props.onDelete]);

  return (
    <HorizontalScrollContainer>
      <table className={styles.screeningPlan}>
        <thead>
          <tr className={styles.weekdays}>
            <th>Mo, {getNextDate(1).toLocaleDateString()}</th>
            <th>Di, {getNextDate(2).toLocaleDateString()}</th>
            <th>Mi, {getNextDate(3).toLocaleDateString()}</th>
            <th>Do, {getNextDate(4).toLocaleDateString()}</th>
            <th>Fr, {getNextDate(5).toLocaleDateString()}</th>
            <th>Sa, {getNextDate(6).toLocaleDateString()}</th>
            <th>So, {getNextDate(0).toLocaleDateString()}</th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>
    </HorizontalScrollContainer>
  );
};

export default Screeningplan;
