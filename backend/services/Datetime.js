const { DateTime } = require("luxon");
const timeZone = process.env.TIME_ZONE || "Europe/Berlin";

const createDatetime = (date, time) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const datetimeString = `${year}-${month}-${day}T${time}`;
  const datetime = DateTime.fromISO(datetimeString, { zone: timeZone });
  return datetime.toJSDate();
};

module.exports = { createDatetime };
