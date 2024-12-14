import {BasicValues, TimeNames, TimeFormat} from './../const.js';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const getTimeValues = (timeValue) => {
  if (timeValue < BasicValues.TIME_STAMP) {
    return TimeFormat.ZERO + timeValue;
  }

  return timeValue;
};

const isFuture = (point) => dayjs().isBefore(point.dateFrom);
const isPresent = (point) => dayjs().isBefore(point.dateTo) && dayjs().isAfter(point.dateFrom);
const isPast = (point) => dayjs().isAfter(point.dateTo);

const humanizePointDueDate = (firstParam, secondParam) => {

  const format = {
    date: dayjs(firstParam).format(TimeFormat.DATE),
    time: dayjs(firstParam).format(TimeFormat.HOUR_MINUTE),
    allDate: dayjs(firstParam).format(TimeFormat.ALL),
    datepicker: dayjs(firstParam).format(TimeFormat.DATEPICKER),

    difference: () => {
      const dayValue = dayjs(secondParam).diff(dayjs(firstParam), TimeNames.DAY);
      const hourValue = dayjs(secondParam).diff(dayjs(firstParam), TimeNames.HOUR);
      const minuteValue = dayjs(secondParam).diff(dayjs(firstParam), TimeNames.MINUTE);

      const daysInHours = dayValue * TimeFormat.HOUR_IN_DAY;
      const totalMinutes = hourValue * TimeFormat.MINUTE_IN_HOUR;

      const currentHours = hourValue - daysInHours;
      const currentMinutes = minuteValue - totalMinutes;

      if (hourValue < TimeFormat.ONE_HOUR) {
        return getTimeValues(minuteValue) + TimeNames.SHORT_MINUTE;
      }

      if (hourValue >= TimeFormat.ONE_HOUR && hourValue < TimeFormat.HOUR_IN_DAY) {
        return `${getTimeValues(hourValue)}${TimeNames.SHORT_HOUR} ${getTimeValues(currentMinutes)}${TimeNames.SHORT_MINUTE}`;
      }

      return `${getTimeValues(dayValue)}${TimeNames.SHORT_DAY} ${getTimeValues(currentHours)}${TimeNames.SHORT_HOUR} ${getTimeValues(currentMinutes)}${TimeNames.SHORT_MINUTE}`;
    },
  };

  return format;
};

const sortPointTime = (a, b) => dayjs(a.dateFrom).diff(dayjs(a.dateTo), TimeNames.HOUR) - dayjs(b.dateFrom).diff(dayjs(b.dateTo), TimeNames.HOUR);

const sortPointPrice = (a, b) => b.basePrice - a.basePrice;

const sortPointDate = (a, b) => dayjs(a.dateFrom) - dayjs(b.dateFrom);

const handlerOffers = (thisOffers, currentPoint, isChecked) => {
  const offersArray = Object.entries(thisOffers).map(([, value]) => value.id);

  offersArray.forEach((el) => {
    currentPoint[BasicValues.CHECKED + el] = isChecked;
  });
};

export {humanizePointDueDate, isFuture, isPresent, isPast, sortPointPrice, sortPointTime, sortPointDate, handlerOffers};
