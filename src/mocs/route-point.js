import {OFFERS, EVENT_TYPES, DESTINATION_CITIES, OFFER_TYPES, POINTS} from './../const.js';
import {getRandomArrayElement} from './../utils.js';

const getRandomPoint = () => getRandomArrayElement(POINTS);

export {getRandomPoint};
