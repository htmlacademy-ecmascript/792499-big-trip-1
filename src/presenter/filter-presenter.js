import {render, replace, remove} from './../framework/render.js';
import Filters from './../view/filters.js';
import {UpdateType, FilterType} from './../const.js';
import {filters} from './../utils/filters-utils.js';

export default class FilterPresenter {
  #filtersContainer = null;
  #filtersModel = null;
  #pointsModel = null;
  #filterComponent = null;
  #presenter = null;
  #points = null;

  constructor({filtersContainer, filtersModel, pointsModel, presenter}) {
    this.#filtersContainer = filtersContainer;
    this.#filtersModel = filtersModel;
    this.#pointsModel = pointsModel;
    this.#presenter = presenter;
  }

  get filters() {
    this.#points = this.#pointsModel.points;

    return Object.entries(filters).map(([filterType, filterPoints]) => ({
      type: filterType,
      has: filterPoints(this.#points).length,
    }));
  }

  init() {
    const currentFilters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new Filters({
      filters: currentFilters,
      currentFilter: this.#filtersModel.filters,
      onChangeFilters: this.#filtersHandler,
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filtersContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #filtersHandler = (filterType) => {
    const currentFilter = filterType.slice(FilterType.FIRST_PART_NAME);
    if (this.#filtersModel.filters === currentFilter) {
      return;
    }

    this.#presenter.resetSortType();
    this.#presenter.renderSorting();
    this.#filtersModel.setFilters(UpdateType.MAJOR, currentFilter);
  };
}
