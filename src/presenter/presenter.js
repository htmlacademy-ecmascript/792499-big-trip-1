import Sorting from './../view/sorting.js';
import EditForm from './../view/edit-form.js';
import Point from './../view/point.js';
import NoPoints from './../view/no-points.js';
import {replace, render} from './../framework/render.js';
import {isEscapeKey} from './../utils/common.js';

export default class Presenter {
  #mainContainer = null;
  #pointModels = null;

  #presenterPoints = [];

  constructor({mainContainer, pointModels}) {
    this.#mainContainer = mainContainer;
    this.#pointModels = pointModels;
  }

  #renderBoard() {
    render(new Sorting(), this.#mainContainer);
    for (let i = 0; i < this.#presenterPoints.length; i++) {
      this.#renderElements(this.#presenterPoints[i]);
    }
  }

  init() {
    this.#presenterPoints = [...this.#pointModels.getPoints()];
    this.#renderBoard();

    if (this.#presenterPoints.length === 0) {
      render(new NoPoints(), this.#mainContainer);
    }
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
