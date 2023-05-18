const timeZone = {
  offset: 60, // Standard offset from UTC in minutes (e.g., UTC+1)
  dstOffset: 1, // DST offset in hours (e.g., 1 hour during DST)
};

const createDatetime = (date, time) => {
  // const datetime = new Date(date);
  // datetime.setUTCHours(time.getUTCHours());
  // datetime.setUTCMinutes(time.getUTCMinutes());
  // datetime.setUTCSeconds(time.getUTCSeconds());
  // datetime.setUTCMilliseconds(time.getUTCMilliseconds());
  // return datetime;

  const datetime = new Date(date);
  const originalTimeString = time.toLocaleString("en-US", {
    timeZone: timeZone,
    hour12: false,
  });

  const originalTime = new Date(`2000-01-01T${originalTimeString}.000`);
  const originalOffset = originalTime.getTimezoneOffset();

  const dstOffset = timeZone.dstOffset * 60; // Convert DST offset from hours to minutes
  const adjustedOffset = originalOffset + dstOffset;

  datetime.setHours(time.getHours() + Math.floor(adjustedOffset / 60));
  datetime.setMinutes(time.getMinutes() + (adjustedOffset % 60));
  datetime.setSeconds(time.getSeconds());
  datetime.setMilliseconds(time.getMilliseconds());

  return datetime;
};

module.exports = { createDatetime };
