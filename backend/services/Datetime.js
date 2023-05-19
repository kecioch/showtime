// const { DateTime } = require("luxon");
const moment = require("moment");
// const timeZone = "Europe/Berlin";

const createDatetime = (date, time) => {
  // const datetime = new Date(date);
  // datetime.setUTCHours(time.getUTCHours());
  // datetime.setUTCMinutes(time.getUTCMinutes());
  // datetime.setUTCSeconds(time.getUTCSeconds());
  // datetime.setUTCMilliseconds(time.getUTCMilliseconds());
  // return datetime;

  // const datetime = DateTime.fromJSDate(date, { zone: timeZone });
  // const adjustedDatetime = datetime.set({
  //   hour: time.getUTCHours(),
  //   minute: time.getUTCMinutes(),
  //   second: time.getUTCSeconds(),
  //   millisecond: time.getUTCMilliseconds(),
  // });

  // return adjustedDatetime.toJSDate();

  // const datetime = moment();
  // datetime.set("year", date.getFullYear());
  // datetime.set("month", date.getMonth());
  // datetime.set("date", date.getDate());
  // datetime.set("hour", time.getHours());
  // datetime.set("minute", time.getMinutes());
  // datetime.set("second", time.getSeconds());
  // return datetime.toDate();

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const datetime = new Date(`${year}-${month}-${day}T${time}`);
  return datetime;
};

module.exports = { createDatetime };
