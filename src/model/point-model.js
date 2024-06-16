import {getRandomPoint} from './../mocs/route-point.js';
import {COUNT_POINTS} from './../const.js';

export default class PointModel {
  points = Array.from({length: COUNT_POINTS}, getRandomPoint);

  getPoints() {
    return this.points;
  }
}
