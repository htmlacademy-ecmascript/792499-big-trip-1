import AbstractView from '../framework/view/abstract-view.js';
import {humanizePointDueDate} from './../utils/points.js';
import {BasicValues} from './../const.js';
import {firstElement, secondElement, lastElement} from './../utils/common.js';

const createRoutes = (points) => {
  const totalBasePrice = () => {
    let sum = BasicValues.ZERO;
    let offersSum = BasicValues.ZERO;

    points.forEach((element) => {
      const {offer} = element;
      offer.forEach((item) => {
        if (item.checked) {
          const {price} = item;
          offersSum += price;
        }
      });
      sum += element.basePrice;
    });

    sum += offersSum;
    return sum;
  };

  const dateFrom = firstElement(points).dateFrom;
  const dateTo = lastElement(points).dateTo;
  const listRoutes = () => {
    if (points.length <= BasicValues.TWO) {
      return `${firstElement(points).destinations.name} &mdash; ${lastElement(points).destinations.name}`;
    } else if (points.length === BasicValues.THREE) {
      return `${firstElement(points).destinations.name} &mdash; ${secondElement(points).destinations.name} &mdash; ${lastElement(points).destinations.name}`;
    } else if (points.length > BasicValues.THREE) {
      return `${firstElement(points).destinations.name} ... ${lastElement(points).destinations.name}`;
    }
  };

  return `<section class="trip-main__trip-info trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${listRoutes()}</h1>
        <p class="trip-info__dates">${humanizePointDueDate(dateFrom).date}&nbsp;&mdash;&nbsp;${humanizePointDueDate(dateTo).date}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalBasePrice()}</span>
      </p>
    </section>`;
};

export default class Routes extends AbstractView {
  #points = null;

  constructor({points}) {
    super();
    this.#points = points;
  }

  get template() {
    return createRoutes(this.#points);
  }
}
