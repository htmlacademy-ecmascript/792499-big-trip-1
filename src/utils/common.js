import {BasicValues} from './../const.js';

const isEscapeKey = (evt) => evt.keyCode === BasicValues.ESCAPE_KEY;
const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

export {isEscapeKey, getRandomArrayElement};
