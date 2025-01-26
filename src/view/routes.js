import AbstractView from '../framework/view/abstract-view.js';

const createRoutes = (cities) => {

  return `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
      ${cities.length < 3 ? `<h1 class="trip-info__title">
          ${cities[0]} &mdash; ${cities[cities.length-1]}
        </h1>` : `<h1 class="trip-info__title">
          ${cities[0]} ... ${cities[cities.length-1]}
        </h1>`}

        <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
      </p>
    </section>`;
}

export default class Routes extends AbstractView {
  #cities = null;

  constructor({cities}) {
    super();
    this.#cities = cities;
  }

  get template() {
    return createRoutes(this.#cities);
  }
}
