import Observable from './../framework/observable.js';
import {UpdateType} from './../const.js';

export default class PointModel extends Observable {
  #pointsApiService = null;
  #points = [];
  #offers = [];
  #destinations = [];
  #cities = [];

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;
    this.#pointsApiService.offers.then((offers) => offers.map((el) => el.offers.forEach((elem) => {
      this.#offers.push(elem);
    })));
    this.#pointsApiService.points.then((points) => {
      points.map((point) => {
        this.#adaptToClient(point);
      });
    });

    this.#pointsApiService.destinations.then((destination) => destination.map((el) => {
      this.#destinations.push(el);
      this.#cities.push(el.name);
    }));
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
      this.#points = points.map((el) => {
        if (this.#destinations.length === 0) {
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

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#pointsApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);
      this.#points = [
        ...this.#points.slice(0, index),
        update,
        ...this.#points.slice(index + 1)
      ];

      this._notify(updateType, updatedPoint);
    } catch(err) {
      throw new Error('Can\'t update point');
    }
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
