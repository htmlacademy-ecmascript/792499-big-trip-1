const isEscapeKey = (evt) => evt.keyCode === 27;
const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

export {isEscapeKey, getRandomArrayElement};
