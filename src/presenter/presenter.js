import Sorting from './../view/sorting.js';
import NoPoints from './../view/no-points.js';
import LoadingView from './../view/loading-view.js';
import {render, RenderPosition, remove} from './../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import {BasicValues, SortType, UserAction, UpdateType, FilterType, TimeLimit} from './../const.js';
import {sortPointPrice, sortPointTime, sortPointDate} from './../utils/points.js';
import PointPresenter from './point-presenter.js';
import RoutesPresenter from './routes-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import Observable from './../framework/observable.js';
import {filters} from './../utils/filters-utils.js';
import BtnNewPoint from './../view/btn-new-point.js';
import FilterPresenter from './filter-presenter.js';
import Tooltip from './../view/tooltip.js';

export default class Presenter extends Observable {
  #mainContainer = null;
  #pointModels = null;
  #destinations = null;
  #offers = null;
  #cities = null;
  #filtersModel = null;
  #currentSortType = SortType.DAY;
  #pointsCollection = new Map();
  #NoPoints = null;
  #filterType = null;
  #newPointPresenter = null;
  #btnNewPoint = null;
  #filterPresenter = null;
  #routesPresenter = null;
  #headerMain = null;
  #filtersContainer = null;
  #sorting = null;
  #tooltip = null;
  #loadingComponent = new LoadingView();
  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT,
  });

  constructor({mainContainer, filtersContainer, pointModels, filtersModel, headerMain}) {
    super();
    this.#mainContainer = mainContainer;
    this.#pointModels = pointModels;
    this.#filtersModel = filtersModel;
    this.#headerMain = headerMain;
    this.#filtersContainer = filtersContainer;

    this.#pointModels.addObserver(this.#modelEventHandler);
    this.#filtersModel.addObserver(this.#modelEventHandler);

    this.#destinations = this.#pointModels.destinations;
    this.#offers = this.#pointModels.offers;
    this.#cities = this.#pointModels.cities;

    this.#newPointPresenter = new NewPointPresenter({
      mainContainer: this.#mainContainer,
      onDataChange: this.#viewActionHandler,
      onDestroy: this.#newFormCloseHandler,
      onErrorForm: this.#errorFormHandler,
      onRemoveErrorForm: this.#removeErrorFormHandler,
    });

    this.#btnNewPoint = new BtnNewPoint({
      onClick: this.#btnNewPointHandler,
      headerMain: this.#headerMain,
    });

    this.#filterPresenter = new FilterPresenter({
      filtersContainer: this.#filtersContainer,
      filtersModel: this.#filtersModel,
      pointsModel: pointModels,
      presenter: this,
    });
  }

  renderFilters() {
    this.#filterPresenter.init();
  }

  renderRoutes() {
    this.#routesPresenter = new RoutesPresenter({
      mainContainer: this.#filtersContainer,
      points: this.points,
    });

    this.#routesPresenter.init();
  }

  renderBoard() {
    for (let i = BasicValues.ZERO; i < this.points.length; i++) {
      this.#renderPoints(this.points[i]);
    }

    this.renderFilters();

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.points.length === BasicValues.ZERO) {
      this.#renderNoPoints();
    }

    if (this.points.length > BasicValues.ZERO) {
      this.renderRoutes();
    }
  }

  renderSorting() {
    this.#sorting = new Sorting({
      onSortTypeChange: this.#sortTypeChangeHandler,
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
    this.#newPointPresenter.init(this.#cities, this.#destinations, this.#offers);
    this.renderSorting();
  }

  clearBoard() {
    this.#routesPresenter.destroy();
    this.#newPointPresenter.destroy();
    this.#pointsCollection.forEach((point) => point.destroy());
    this.#pointsCollection.clear();
    remove(this.#loadingComponent);

    if (this.#NoPoints) {
      remove(this.#NoPoints);
    }
  }

  resetSortType = () => {
    remove(this.#sorting);
    this.#currentSortType = SortType.DAY;
  };

  #renderPoints(point) {
    const pointPresenter = new PointPresenter({
      container: this.#mainContainer,
      onDataChange: this.#viewActionHandler,
      onModeChange: this.#modeChangeHandler,
      onCurrentErrorForm: this.#errorFormHandler,
    });

    pointPresenter.init(point, this.#destinations, this.#offers, this.#cities);
    this.#pointsCollection.set(point.id, pointPresenter);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#mainContainer, RenderPosition.AFTERBEGIN);
  }

  #renderNoPoints() {
    this.#NoPoints = new NoPoints({filterType: this.#filterType});
    render(this.#NoPoints, this.#mainContainer);
  }

  #modeChangeHandler = () => {
    this.#newPointPresenter.destroy();
    this.#pointsCollection.forEach((point) => {
      point.resetView();
    });
  };

  #viewActionHandler = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsCollection.get(update.id).setSaving();
        try {
          await this.#pointModels.updatePoint(updateType, update);
        } catch(err) {
          this.#pointsCollection.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointModels.addPoint(updateType, update);
        } catch(err) {
          this.#pointsCollection.get(update.id).setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointsCollection.get(update.id).setDeleting();
        try {
          await this.#pointModels.deletePoint(updateType, update);
        } catch(err) {
          this.#pointsCollection.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #modelEventHandler = (updateType, data) => {
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
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.renderBoard();
        break;
    }
  };

  #sortTypeChangeHandler = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#modelEventHandler(UpdateType.MINOR);
  };

  #btnNewPointHandler = () => {
    this.createTask();
  };

  #newFormCloseHandler = () => {
    this.#btnNewPoint.formCloseHandler();
  };

  #errorFormHandler = (container, thisTextContent) => {
    this.#tooltip = new Tooltip({
      textContent: thisTextContent,
    });

    render(this.#tooltip, container);
  };

  #removeErrorFormHandler = () => {
    remove(this.#tooltip);
  };
}
