import {BasicValues} from './../const.js';

const isEscapeKey = (evt) => evt.keyCode === BasicValues.ESCAPE_KEY;
const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];
const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

export {isEscapeKey, getRandomArrayElement, updateItem};
