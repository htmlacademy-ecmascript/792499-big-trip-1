import {TimeNames, TimeFormat} from './const.js';
import dayjs from 'dayjs';

const checkingValues = (timeValue) => {
  if (timeValue < 10) {
    return TimeFormat.ZERO + timeValue;
  } else {
    return timeValue;
  }
};

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];
const humanizePointDueDate = (firstParam, secondParam) => {

  const format = {
    date: dayjs(firstParam).format(TimeFormat.DATE),
    time: dayjs(firstParam).format(TimeFormat.HOUR_MINUTE),
    allDate: dayjs(firstParam).format(TimeFormat.ALL),
    difference: () => {
      const dayValue = dayjs(secondParam).diff(dayjs(firstParam), TimeNames.DAY);
      const hourValue = dayjs(secondParam).diff(dayjs(firstParam), TimeNames.HOUR);
      const minuteValue = dayjs(secondParam).diff(dayjs(firstParam), TimeNames.MINUTE);

      const daysInHours = dayValue * TimeFormat.HOUR_IN_DAY;
      const totalMinutes = hourValue * TimeFormat.MINUTE_IN_HOUR;

      const currentHours = hourValue - daysInHours;
      const currentMinutes = minuteValue - totalMinutes;

      if (hourValue < 1) {
        return checkingValues(minuteValue) + TimeNames.ABBR_MINUTE;
      } else if (hourValue >= 1 && hourValue < 24) {
        return `${checkingValues(hourValue)}${TimeNames.ABBR_HOUR} ${checkingValues(currentMinutes)}${TimeNames.ABBR_MINUTE}`;
      }

      return `${checkingValues(dayValue)}${TimeNames.ABBR_DAY} ${checkingValues(currentHours)}${TimeNames.ABBR_HOUR} ${checkingValues(currentMinutes)}${TimeNames.ABBR_MINUTE}`;
    },
  };

  return format;
};

export {getRandomArrayElement, humanizePointDueDate};
