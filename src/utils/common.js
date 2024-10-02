import {BasicValues} from './../const.js';

const isEscapeKey = (evt) => evt.keyCode === BasicValues.ESCAPE_KEY;
const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];
const capitalize = (word) => {
  const firstChar = word.charAt(0).toUpperCase();
  const remainingChar = word.slice(1);
  return `${firstChar}${remainingChar}`;
};

export {isEscapeKey, getRandomArrayElement, capitalize};
