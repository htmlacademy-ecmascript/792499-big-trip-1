import Sorting from './../view/sorting.js';
//import EditForm from './../view/edit-form.js';
//import Point from './../view/point.js';
import NoPoints from './../view/no-points.js';
import {render} from './../framework/render.js';
import PointPresenter from './point-presenter.js';

export default class Presenter {
  #mainContainer = null;
  #pointModels = null;

  #presenterPoints = [];

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
    this.#renderBoard();
    this.#renderSorting();

    if (this.#presenterPoints.length === 0) {
      render(new NoPoints(), this.#mainContainer);
    }
  }

  #renderSorting() {
    render(new Sorting(), this.#mainContainer);
  }

  #renderPoints(point) {
    const pointPresenter = new PointPresenter({container: this.#mainContainer});
    pointPresenter.init(point);
  }
}
