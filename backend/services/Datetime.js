const createDatetime = (date, time) => {
  //   return new Date(
  //     date.getFullYear(),
  //     date.getMonth(),
  //     date.getDate(),
  //     time.getHours(),
  //     time.getMinutes(),
  //     time.getSeconds(),
  //     time.getMilliseconds()
  //   );
  const datePart = date.toISOString().slice(0, 10);
  const timePart = time.toISOString().slice(11, 23); 

  const combinedIsoString = datePart + "T" + timePart + "Z";
  console.log("ISOSTRING", combinedIsoString);
  return new Date(combinedIsoString);
};

module.exports = { createDatetime };
