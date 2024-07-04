import {render} from './../render.js';
import {NoPointsFilter} from './../const.js';
import createNoPoints from './../view/no-points.js';
import Filters from './../view/filters.js';

export default class FilterPresenter {
  #mainContainer = null;
  #filtersContainer = null;
  #pointModels = null;

  constructor({mainContainer, filtersContainer, pointModels}) {
    this.#mainContainer = mainContainer;
    this.#filtersContainer = filtersContainer;
    this.#pointModels = pointModels;
  }

  init() {
    const pointCollection = this.#mainContainer.querySelectorAll('.event');
    if (pointCollection.length === 0) {
      render(new createNoPoints(), this.#mainContainer);
    }

    render(new Filters({onTabClick: () => {
      const checkedBtn = this.#filtersContainer.querySelector('input[name=trip-filter]:checked');
      const eventsMessage = this.#mainContainer.querySelector('.trip-events__msg');

      if (eventsMessage) {
        const checkedBtnValue = checkedBtn.value.toUpperCase();
        eventsMessage.textContent = NoPointsFilter[checkedBtnValue];
      }
    }}), this.#filtersContainer);
  }
}
