import AbstractView from './../framework/view/abstract-view.js';
import {FilterMessage} from './../const.js';

const createNoPoints = () => `<section class="trip-events">
    <h2 class="visually-hidden">Trip events</h2>

    <p class="trip-events__msg">${FilterMessage.EVERYTHING}</p>
  </section>`;

export default class noPoints extends AbstractView {
  get template() {
    return createNoPoints();
  }
}
