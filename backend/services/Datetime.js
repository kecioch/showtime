const createDatetime = (date, time) => {
    const datetime = new Date(date);
    datetime.setUTCHours(time.getUTCHours());
    datetime.setUTCMinutes(time.getUTCMinutes());
    datetime.setUTCSeconds(time.getUTCSeconds());
    datetime.setUTCMilliseconds(time.getUTCMilliseconds());

    return datetime;

  // const datePart = date.toISOString().slice(0, 10);
  // const timePart = time.toISOString().slice(11, 23); 

  // const combinedIsoString = datePart + "T" + timePart + "Z";
  // console.log("ISOSTRING", combinedIsoString);
  // return new Date(combinedIsoString);
};

module.exports = { createDatetime };
