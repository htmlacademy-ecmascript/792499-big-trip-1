import Filters from './../view/filters.js';
import Sorting from './../view/sorting.js';
import EditForm from './../view/edit-form.js';
import Point from './../view/point.js';
import createNoPoints from './../view/no-points.js';
import {render} from './../render.js';
import {isEscapeKey} from './../utils.js';
import {replace} from './../framework/render.js';

export default class Presenter {
  #mainContainer = null;
  #filtersContainer = null;
  #pointModels = null;

  #presenterPoints = [];

  constructor({mainContainer, filtersContainer, pointModels}) {
    this.#mainContainer = mainContainer;
    this.#filtersContainer = filtersContainer;
    this.#pointModels = pointModels;
  }

  #renderBoard() {
    if (this.#presenterPoints.length === 0) {
      render(new createNoPoints(), this.#mainContainer);
      return;
    }

    render(new Filters(), this.#filtersContainer);
    render(new Sorting(), this.#mainContainer);

    for (let i = 0; i < this.#presenterPoints.length; i++) {
      this.#renderElements(this.#presenterPoints[i]);
    }
  }

  init() {
    this.#presenterPoints = [...this.#pointModels.getPoints()];
    this.#renderBoard();
  }

  #renderElements(point) {
    const onDocumentKeydown = (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onDocumentKeydown);
      }
    };

    const currentPoint = new Point({point: point, onRollupClick: () => {
      replacePointToForm();
      document.addEventListener('keydown', onDocumentKeydown);
    }});

    const currentForm = new EditForm({point: point, onFormSubmit: () => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onDocumentKeydown);
    }});

    function replacePointToForm() {
      replace(currentForm, currentPoint);
    }

    function replaceFormToPoint() {
      replace(currentPoint, currentForm);
    }

    render(currentPoint, this.#mainContainer);
  }
}
