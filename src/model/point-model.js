import Observable from './../framework/observable.js';
import {getRandomPoint} from './../mocs/route-point.js';
import {BasicValues} from './../const.js';

export default class PointModel extends Observable {
  #pointsApiService = null;
  #points = Array.from({length: BasicValues.COUNT_POINTS}, getRandomPoint);

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;
    this.#pointsApiService.points.then((points) => {
      points.map((point) => this.#adaptToClient(point));
    });
  }

  get points() {
    return this.#points;
  }

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points = [update, ...this.#points];
    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1)
    ];

    this._notify(updateType);
  }

  #adaptToClient(point) {
    const adaptedPoint = {
      ...point,
      isFavorite: point['is_favorite'],
      basePrice: point['base_price'],
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) : point['date_from'],
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['is_favorite'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];

    return adaptedPoint;
  }
}
