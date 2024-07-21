import Point from './../view/point.js';
import EditForm from './../view/edit-form.js';
import {isEscapeKey} from './../utils/common.js';
import {replace, render} from './../framework/render.js';

export default class PointPresenter {
  #currentPoint = null;
  #currentForm = null;
  #mainContainer = null;

  constructor({container}) {
    this.#mainContainer = container;
  }

  #onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#onDocumentKeydown);
    }
  };

  init(point) {
    this.#currentPoint = new Point({point: point, onRollupClick: () => {
      this.#replacePointToForm();
      document.addEventListener('keydown', this.#onDocumentKeydown);
    }});

    this.#currentForm = new EditForm({point: point, onFormSubmit: () => {
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#onDocumentKeydown);
    }});

    render(this.#currentPoint, this.#mainContainer);
  }
  
  #replacePointToForm() {
    replace(this.#currentForm, this.#currentPoint);
  }

  #replaceFormToPoint() {
    replace(this.#currentPoint, this.#currentForm);
  }
}
