import AbstractView from './../framework/view/abstract-view.js';

const createFilters = (filter) => {
  const createMarkup = (dataFilter) => Object.entries(dataFilter).map(([, data]) => `
    <div class="trip-filters__filter">
      <input id="filter-${data.type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${data.type}" checked ${data.has ? '' : 'disabled'}>
      <label class="trip-filters__filter-label" for="filter-${data.type}">${data.type}</label>
    </div>`).join('');

  return `
    <form class="trip-filters" action="#" method="get">
      ${createMarkup(filter)}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
};

export default class Filters extends AbstractView {
  #filters = null;

  constructor({filters}) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilters(this.#filters);
  }
}
