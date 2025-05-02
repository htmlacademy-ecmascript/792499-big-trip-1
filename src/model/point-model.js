import Observable from './../framework/observable.js';
import {BasicValues, UpdateType} from './../const.js';

export default class PointModel extends Observable {
  #pointsApiService = null;
  #points = [];
  #offers = [];
  #destinations = [];
  #cities = [];

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  get cities() {
    return this.#cities;
  }

  async init() {
    try {
      const points = await this.#pointsApiService.points;
      const offers = await this.#pointsApiService.offers;
      const destinations = await this.#pointsApiService.destinations;
      offers.map((el) => el.offers.forEach((elem) => {
        this.#offers.push(elem);
      }))
      destinations.map((el) => {
        this.#destinations.push(el);
        this.#cities.push(el.name);
      });
      this.#points = points.map((el) => {
        if (this.#destinations.length === BasicValues.ZERO) {
          throw new SyntaxError('Не удалось загрузить часть данных');
        }
        return this.#adaptToClient(el);
      });
    } catch(err) {
      this.#points = [];
    }

    this._notify(UpdateType.INIT);
  }

  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === BasicValues.MINUS_ONE) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#pointsApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);
      this.#points = [
        ...this.#points.slice(BasicValues.ZERO, index),
        update,
        ...this.#points.slice(index + BasicValues.ONE)
      ];

      this._notify(updateType, updatedPoint);
    } catch(err) {
      throw new Error('Can\'t update point');
    }
  }

  async addPoint(updateType, update) {
    try {
      const response = await this.#pointsApiService.addPoint(update);
      const newPoint = this.#adaptToClient(response);
      this.#points = [newPoint, ...this.#points];
      this._notify(updateType, newPoint);
    } catch(err) {
      throw new Error('Can\'t add point');
    }
  }

  async deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === BasicValues.MINUS_ONE) {
      throw new Error('Can\'t delete unexisting point');
    }

    try {
      await this.#pointsApiService.deletePoint(update);
      this.#points = [
        ...this.#points.slice(BasicValues.ZERO, index),
        ...this.#points.slice(index + BasicValues.ONE)
      ];

      this._notify(updateType);
    } catch {
      throw new Error('Can\'t delete point');
    }
  }

  #getCurrentOffers = (point) => {

    const selectOffers = [];
    this.#offers.forEach((el) => {
      point.offers.forEach((elem) => {
        if (el.id === elem) {
          el.type = point.type;
          selectOffers.push(el);
        }
      });
    });

    return selectOffers;
  };

  #getCurrentDestination = (id) => {
    let selectDestination;
    this.#destinations.forEach((el) => {
      if (id === el.id) {
        selectDestination = el;
      }
    });
    return selectDestination;
  };

  #adaptToClient(point) {

    const adaptedPoint = {
      ...point,
      isFavorite: point['is_favorite'],
      basePrice: point['base_price'],
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
      offer: this.#getCurrentOffers(point),
      destinations: this.#getCurrentDestination(point.destination),
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['is_favorite'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['offers'];
    delete adaptedPoint['destination'];

    return adaptedPoint;
  }
}
