import AbstractView from '../framework/view/abstract-view.js';
import {humanizePointDueDate} from './../utils/points.js';
import {BasicValues} from './../const.js';
import {firstElement, lastElement} from './../utils/common.js';

const createRoutes = (cities, points) => {

  const dateFrom = firstElement(points).dateFrom;
  const dateTo = lastElement(points).dateTo;

  return `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
      ${cities.length < BasicValues.THREE ? `<h1 class="trip-info__title">
          ${firstElement(cities)} &mdash; ${lastElement(cities)}
        </h1>` : `<h1 class="trip-info__title">
          ${firstElement(cities)} ... ${lastElement(cities)}
        </h1>`}

        <p class="trip-info__dates">${humanizePointDueDate(dateFrom).date}&nbsp;&mdash;&nbsp;${humanizePointDueDate(dateTo).date}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
      </p>
    </section>`;
};

export default class Routes extends AbstractView {
  #cities = null;
  #points = null;

  constructor({cities, points}) {
    super();
    this.#cities = cities;
    this.#points = points;
  }

  get template() {
    return createRoutes(this.#cities, this.#points);
  }
}
