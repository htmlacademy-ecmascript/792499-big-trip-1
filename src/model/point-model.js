import {getRandomPoint} from './../mocs/route-point.js';
import {BasicValues} from './../const.js';

export default class PointModel {
  #points = Array.from({length: BasicValues.COUNT_POINTS}, getRandomPoint);

  getPoints() {
    return this.#points;
  }
}
