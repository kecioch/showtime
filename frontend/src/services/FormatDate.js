const getTimeString = (date) => {
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

const getWeekCounter = (date) => {
  // current date
  const today = new Date();

  // diff in ms
  const timeDiff = today.getTime() - date.getTime();

  // ms / week
  const oneWeek = 1000 * 60 * 60 * 24 * 7;

  // calculate weeks
  const weeks = Math.floor(timeDiff / oneWeek);

  return weeks + 1;
};

export { getTimeString, getWeekCounter };
