const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const weekdayToIndex = (day) => weekdays.findIndex((el) => el === day);

const indexToWeekDay = (index) => weekdays[index];

const getNextDate = (dayIndex) => {
  const now = new Date();
  const daysUntilNextDayOfWeek = (dayIndex - now.getDay() + 7) % 7;
  const nextDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + daysUntilNextDayOfWeek
  );
  return nextDate;
};

module.exports = { weekdayToIndex, indexToWeekDay, getNextDate };
