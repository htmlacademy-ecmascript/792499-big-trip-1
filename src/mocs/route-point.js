import {nanoid} from 'nanoid';
import {POINTS} from './../const.js';
import {getRandomArrayElement} from './../utils/common.js';

const getRandomPoint = () => (
  {
    id: nanoid(),
    ...getRandomArrayElement(POINTS),
  });

export {getRandomPoint};
