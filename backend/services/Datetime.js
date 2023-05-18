const createDatetime = (date, time) => {
    const datetime = new Date(date);
    datetime.setHours(time.getUTCHours());
    datetime.setMinutes(time.getUTCMinutes());
    datetime.setSeconds(time.getUTCSeconds());
    datetime.setMilliseconds(time.getUTCMilliseconds());

    return datetime;

  // const datePart = date.toISOString().slice(0, 10);
  // const timePart = time.toISOString().slice(11, 23); 

  // const combinedIsoString = datePart + "T" + timePart + "Z";
  // console.log("ISOSTRING", combinedIsoString);
  // return new Date(combinedIsoString);
};

module.exports = { createDatetime };
