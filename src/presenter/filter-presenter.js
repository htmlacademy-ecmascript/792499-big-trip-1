import {render} from './../framework/render.js';
//import {FilterType} from './../const.js';
//import createNoPoints from './../view/no-points.js';
import Filters from './../view/filters.js';
import {generateFilters} from './../mocs/filters.js';

export default class FilterPresenter {
  #filtersContainer = null;
  #filters = null;

  constructor({filtersContainer, pointModels}) {
    this.#filtersContainer = filtersContainer;
    this.#filters = generateFilters(pointModels.getPoints());
  }

  init() {
    render(new Filters({filters: this.#filters,}), this.#filtersContainer);
  }
}
