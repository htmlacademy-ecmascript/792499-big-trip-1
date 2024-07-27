import Sorting from './../view/sorting.js';
import NoPoints from './../view/no-points.js';
import {render} from './../framework/render.js';
import {updateItem} from './../utils/common.js';
import {SortType} from './../const.js';
import {sortPointPrice, sortPointTime} from './../utils/points.js';
import PointPresenter from './point-presenter.js';

export default class Presenter {
  #mainContainer = null;
  #pointModels = null;
  #currentSortType = SortType.DAY;
  #primarySortPoints = [];

  #presenterPoints = [];
  #pointsCollection = new Map();

  constructor({mainContainer, pointModels}) {
    this.#mainContainer = mainContainer;
    this.#pointModels = pointModels;
  }

  #renderBoard() {
    for (let i = 0; i < this.#presenterPoints.length; i++) {
      this.#renderPoints(this.#presenterPoints[i]);
    }
  }

  init() {
    this.#presenterPoints = [...this.#pointModels.getPoints()];
    this.#primarySortPoints = [...this.#pointModels.getPoints()];
    this.#renderSorting();
    this.#renderBoard();

    if (this.#presenterPoints.length === 0) {
      render(new NoPoints(), this.#mainContainer);
    }
  }

  #clearPoints() {
    this.#pointsCollection.forEach((point) => point.destroy());
    this.#pointsCollection.clear();
  }

  #renderSorting() {
    render(new Sorting({onSortTypeChange: this.#handleSortTypeChange}), this.#mainContainer);
  }

  #renderPoints(point) {
    const pointPresenter = new PointPresenter({
      container: this.#mainContainer,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point);
    this.#pointsCollection.set(point.id, pointPresenter);
  }

  #sortPoints(sortType) {

    switch (sortType){
      case SortType.TIME:
        this.#presenterPoints.sort(sortPointTime);
        break;
      case SortType.PRICE:
        this.#presenterPoints.sort(sortPointPrice);
        break;
      default:
        this.#presenterPoints = [...this.#primarySortPoints];
    }

    this.#currentSortType = sortType;
  };

  #handlePointChange = (updatedPoint) => {
    this.#presenterPoints = updateItem(this.#presenterPoints, updatedPoint);
    this.#primarySortPoints = updateItem(this.#presenterPoints, updatedPoint);
    this.#pointsCollection.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointsCollection.forEach((point) => {
      point.resetView();
    });
  };

  #handleSortTypeChange =(sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPoints();
    this.#renderBoard();
  }
}
