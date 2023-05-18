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

  const datetime = moment()
    .year(date.getYear())
    .month(date.getMonth())
    .date(date.getDate())
    .hour(time.getUTCHours())
    .minute(time.getUTCMinutes())
    .second(time.getUTCSeconds());

  return datetime.toDate();
};

module.exports = { createDatetime };
