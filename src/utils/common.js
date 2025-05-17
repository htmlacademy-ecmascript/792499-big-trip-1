import {BasicValues} from './../const.js';

const isEscapeKey = (evt) => evt.keyCode === BasicValues.ESCAPE_KEY;
const capitalize = (word) => {
  const firstChar = word.charAt(BasicValues.ZERO).toUpperCase();
  const remainingChar = word.slice(BasicValues.ONE);
  return `${firstChar}${remainingChar}`;
};

const checkingForms = {
  styleError: (input, container) => {
    input.style = 'border: 1px solid red';
    input.value = '';
    container.style.setProperty('position', 'relative');
  },
  styleErrorDate: (container) => {
    container.style.setProperty('position', 'relative');
  },
  priceInputCorrect: (input, price) => {
    input.value = Math.floor(price);
    input.style = '';
  },
};

const firstElement = (arrayName) => arrayName[BasicValues.ZERO];
const secondElement = (arrayName) => arrayName[BasicValues.ONE];
const lastElement = (arrayName) => arrayName[arrayName.length - BasicValues.ONE];

export {isEscapeKey, capitalize, checkingForms, firstElement, secondElement, lastElement};
