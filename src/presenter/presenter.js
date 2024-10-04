import Sorting from './../view/sorting.js';
import NoPoints from './../view/no-points.js';
import {render, remove} from './../framework/render.js';
import {SortType, UserAction, UpdateType} from './../const.js';
import {sortPointPrice, sortPointTime} from './../utils/points.js';
import PointPresenter from './point-presenter.js';
import Observable from './../framework/observable.js';
import {filters} from './../utils/filters-utils.js';

export default class Presenter extends Observable {
  #mainContainer = null;
  #pointModels = null;
  #filtersModel = null;
  #currentSortType = SortType.DAY;
  #pointsCollection = new Map();
  #noPoints = null;
  #filterType = null;

  constructor({mainContainer, pointModels, filtersModel}) {
    super();
    this.#mainContainer = mainContainer;
    this.#pointModels = pointModels;
    this.#filtersModel = filtersModel;

    this.#pointModels.addObserver(this.#handlerModelEvent);
    this.#filtersModel.addObserver(this.#handlerModelEvent);
  }

  renderBoard() {
    for (let i = 0; i < this.points.length; i++) {
      this.#renderPoints(this.points[i]);
    }

    if (this.points.length === 0) {
      this.#renderNoPoints();
    }
  }

  get points() {
    this.#filterType = this.#filtersModel.filters;
    const points = this.#pointModels.points;
    const filteredPoints = filters[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.TIME:
        filteredPoints.sort(sortPointTime);
        break;
      case SortType.PRICE:
        filteredPoints.sort(sortPointPrice);
        break;
    }

    return filteredPoints;
  }

  init() {
    this.#renderSorting();
    this.renderBoard();
  }

  clearBoard() {
    this.#pointsCollection.forEach((point) => point.destroy());
    this.#pointsCollection.clear();

    if (this.#noPoints) {
      remove(this.#noPoints);
    }
  }

  #renderSorting() {
    render(new Sorting({onSortTypeChange: this.#handlerSortTypeChange}), this.#mainContainer);
  }

  #renderPoints(point) {
    const pointPresenter = new PointPresenter({
      container: this.#mainContainer,
      onDataChange: this.#handlerViewAction,
      onModeChange: this.#handlerModeChange,
    });

    pointPresenter.init(point);
    this.#pointsCollection.set(point.id, pointPresenter);
  }

  #renderNoPoints() {
    this.#noPoints = new NoPoints({filterType: this.#filterType});
    render(this.#noPoints, this.#mainContainer);
  }

  #handlerModeChange = () => {
    this.#pointsCollection.forEach((point) => {
      point.resetView();
    });
  };

  #handlerViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointModels.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointModels.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointModels.deletePoint(updateType, update);
        break;
    }
  };

  #handlerModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointsCollection.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.clearBoard();
        this.renderBoard();
        break;
      case UpdateType.MAJOR:
        this.clearBoard();
        this.renderBoard();
        break;
    }
  };

  #handlerSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.clearBoard();
    this.renderBoard();
  };
}
