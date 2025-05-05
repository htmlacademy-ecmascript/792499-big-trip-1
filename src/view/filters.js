import AbstractView from './../framework/view/abstract-view.js';

const createFilters = (filter, currentFilter) => {
  const createMarkup = (dataFilter) => Object.entries(dataFilter).map(([, data]) => `
    <div class="trip-filters__filter">
      <input id="filter-${data.type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${data.type}" ${data.type === currentFilter ? 'checked' : ''} ${data.has ? '' : 'disabled'}>
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
  #currentFilter = null;
  #filtersHandler = null;

  constructor({filters, currentFilter, onChangeFilters}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilter;
    this.#filtersHandler = onChangeFilters;
    this.element.addEventListener('click', this.#filtersChangeHandler);
  }

  get template() {
    return createFilters(this.#filters, this.#currentFilter);
  }

  #filtersChangeHandler = (evt) => {
    const currentInput = evt.target;
    if (currentInput.classList.contains('trip-filters__filter-input')) {
      this.#filtersHandler(currentInput.id);
    }
  };
}
