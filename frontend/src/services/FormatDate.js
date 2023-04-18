const getTimeString = (date) => {
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export { getTimeString };
