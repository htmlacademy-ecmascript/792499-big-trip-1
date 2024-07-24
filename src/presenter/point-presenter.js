import Point from './../view/point.js';
import EditForm from './../view/edit-form.js';
import {isEscapeKey} from './../utils/common.js';
import {replace, render, remove} from './../framework/render.js';

export default class PointPresenter {
  #currentPoint = null;
  #currentForm = null;
  #mainContainer = null;
  #handleDataChange = null;

  constructor({container, onDataChange}) {
    this.#mainContainer = container;
    this.#handleDataChange = onDataChange;
  }

  #onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#onDocumentKeydown);
    }
  };

  init(point) {
    const prevCurrentPoint = this.#currentPoint;
    const prevCurrentForm = this.#currentForm;

    this.#currentPoint = new Point({
      point: point, 
      onRollupClick: () => {
        this.#replacePointToForm();
        document.addEventListener('keydown', this.#onDocumentKeydown);
      },
      onFavoriteClick: () => {
        this.#handleDataChange({...point, isFavorite: !point.isFavorite});
      },
    });

    this.#currentForm = new EditForm({point: point, onFormSubmit: () => {
      this.#replaceFormToPoint();
      this.#handleDataChange(point);
      document.removeEventListener('keydown', this.#onDocumentKeydown);
    }});

    if (prevCurrentPoint === null || prevCurrentForm === null) {
      render(this.#currentPoint, this.#mainContainer);
      return;
    };

    if (this.#mainContainer.contains(prevCurrentPoint.element)) {
      replace(this.#currentPoint, prevCurrentPoint);
    };

    if (this.#mainContainer.contains(prevCurrentForm.element)) {
      replace(this.#currentForm, prevCurrentForm);
    };

    remove(prevCurrentPoint);
    remove(prevCurrentForm);
  }

  destroy() {
    remove(this.#currentPoint);
    remove(this.#currentForm);
  }
  
  #replacePointToForm() {
    replace(this.#currentForm, this.#currentPoint);
  }

  #replaceFormToPoint() {
    replace(this.#currentPoint, this.#currentForm);
  }
}
