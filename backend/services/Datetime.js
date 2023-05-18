const { DateTime } = require("luxon");

const timeZone = "Europe/Berlin";

const createDatetime = (date, time) => {
  // const datetime = new Date(date);
  // datetime.setUTCHours(time.getUTCHours());
  // datetime.setUTCMinutes(time.getUTCMinutes());
  // datetime.setUTCSeconds(time.getUTCSeconds());
  // datetime.setUTCMilliseconds(time.getUTCMilliseconds());
  // return datetime;

  const datetime = DateTime.fromJSDate(date, { zone: "UTC" });

  const originalTimeString = time.toISOString().substr(11, 8);
  const originalTime = DateTime.fromISO(originalTimeString, {
    zone: "UTC",
  });

  const adjustedDatetime = datetime.set({
    hour: originalTime.hour,
    minute: originalTime.minute,
    second: originalTime.second,
    millisecond: originalTime.millisecond,
  });

  return adjustedDatetime.setZone(timeZone).toJSDate();
};

module.exports = { createDatetime };
