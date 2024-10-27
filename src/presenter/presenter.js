import Sorting from './../view/sorting.js';
import NoPoints from './../view/no-points.js';
import {render, RenderPosition, remove} from './../framework/render.js';
import {SortType, UserAction, UpdateType, FilterType} from './../const.js';
import {sortPointPrice, sortPointTime, sortPointDate} from './../utils/points.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import Observable from './../framework/observable.js';
import {filters} from './../utils/filters-utils.js';
import BtnNewPoint from './../view/btn-new-point.js';

export default class Presenter extends Observable {
  #mainContainer = null;
  #pointModels = null;
  #filtersModel = null;
  #currentSortType = SortType.DAY;
  #pointsCollection = new Map();
  #noPoints = null;
  #filterType = null;
  #newPointPresenter = null;
  #btnNewPoint = null;
  #headerMain = null;
  #sorting = null;

  constructor({mainContainer, pointModels, filtersModel, headerMain}) {
    super();
    this.#mainContainer = mainContainer;
    this.#pointModels = pointModels;
    this.#filtersModel = filtersModel;
    this.#headerMain = headerMain;

    this.#pointModels.addObserver(this.#handlerModelEvent);
    this.#filtersModel.addObserver(this.#handlerModelEvent);

    this.#newPointPresenter = new NewPointPresenter({
      mainContainer: this.#mainContainer,
      onDataChange: this.#handlerViewAction,
      onDestroy: this.#handlerNewFormClose,
      presenter: this,
    });

    this.#btnNewPoint = new BtnNewPoint({
      onClick: this.#handlerBtnNewPoint,
      headerMain: this.#headerMain,
    });
  }

  renderBoard() {
    for (let i = 0; i < this.points.length; i++) {
      this.#renderPoints(this.points[i]);
    }

    if (this.points.length === 0) {
      this.#renderNoPoints();
    }
  }

  renderSorting() {
    this.#sorting = new Sorting({
      onSortTypeChange: this.#handlerSortTypeChange,
    });

    render(this.#sorting, this.#mainContainer, RenderPosition.AFTERBEGIN);
  }

  get points() {
    this.#filterType = this.#filtersModel.filters;
    const points = this.#pointModels.points;
    const filteredPoints = filters[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        filteredPoints.sort(sortPointDate);
        break;
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
    this.renderBoard();
    this.renderSorting();
  }

  createTask() {
    this.resetSortType();
    this.#filtersModel.setFilters(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
    this.renderSorting();
  }

  clearBoard() {
    this.#newPointPresenter.destroy();
    this.#pointsCollection.forEach((point) => point.destroy());
    this.#pointsCollection.clear();

    if (this.#noPoints) {
      remove(this.#noPoints);
    }
  }

  resetSortType = () => {
    remove(this.#sorting);
    this.#currentSortType = SortType.DAY;
  };

  #renderPoints(point) {
    const pointPresenter = new PointPresenter({
      container: this.#mainContainer,
      onDataChange: this.#handlerViewAction,
      onModeChange: this.#handlerModeChange,
      newPointPresenter: this.#newPointPresenter,
    });

    pointPresenter.init(point);
    this.#pointsCollection.set(point.id, pointPresenter);
  }

  #renderNoPoints() {
    this.#noPoints = new NoPoints({filterType: this.#filterType});
    render(this.#noPoints, this.#mainContainer);
  }

  #handlerModeChange = () => {
    this.#newPointPresenter.destroy();
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
    this.#handlerModelEvent(UpdateType.MINOR);
  };

  #handlerBtnNewPoint = () => {
    this.createTask();
  };

  #handlerNewFormClose = () => {
    this.#btnNewPoint._handlerFormClose();
  };
}
