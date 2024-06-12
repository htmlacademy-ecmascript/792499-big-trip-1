import DARE_FORMAT from './../const.js';

const getRandomArrayElement = (items) => {
  return items[Math.floor(Math.random() * items.length)];
};

const humanizeTaskDueDate = (dueDate) => {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT) : '';
};

export {getRandomArrayElement};
