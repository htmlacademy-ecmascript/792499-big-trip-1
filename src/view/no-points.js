import AbstractView from './../framework/view/abstract-view.js';
import {FilterMessage} from './../const.js';

const createNoPoints = (filterType) => `<section class="trip-events">
    <h2 class="visually-hidden">Trip events</h2>

    <p class="trip-events__msg">${FilterMessage[filterType]}</p>
  </section>`;

export default class NoPoints extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoPoints(this.#filterType.toUpperCase());
  }
}
