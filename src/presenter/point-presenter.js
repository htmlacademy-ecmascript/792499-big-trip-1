import Point from './../view/point.js';
import EditForm from './../view/edit-form.js';
import {isEscapeKey} from './../utils/common.js';
import {replace, render, remove} from './../framework/render.js';
import {Mode} from './../const.js';

export default class PointPresenter {
  #currentPoint = null;
  #currentForm = null;
  #mainContainer = null;
  #handleDataChange = null;
  #handleModeChange = null;
  #point = null;
  #mode = Mode.DEFAULT;

  constructor({container, onDataChange, onModeChange}) {
    this.#mainContainer = container;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  #onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#onDocumentKeydown);
    }
  };

  init(point) {
    this.#point = point;
    const prevCurrentPoint = this.#currentPoint;
    const prevCurrentForm = this.#currentForm;

    this.#currentPoint = new Point({
      point: this.#point,
      onRollupClick: this.#handleRollupClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#currentForm = new EditForm({
      point: this.#point, 
      onFormSubmit: this.#handleFormSubmit,
    });

    if (prevCurrentPoint === null || prevCurrentForm === null) {
      render(this.#currentPoint, this.#mainContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#currentPoint, prevCurrentPoint);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#currentForm, prevCurrentForm);
    }

    remove(prevCurrentPoint);
    remove(prevCurrentForm);
  }

  destroy() {
    remove(this.#currentPoint);
    remove(this.#currentForm);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  }

  #replacePointToForm() {
    replace(this.#currentForm, this.#currentPoint);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint() {
    replace(this.#currentPoint, this.#currentForm);
    this.#mode = Mode.DEFAULT;
  }

  #handleRollupClick = () => {
    this.#replacePointToForm();
    document.addEventListener('keydown', this.#onDocumentKeydown);
  }

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  }

  #handleFormSubmit = () => {
    this.#replaceFormToPoint();
    this.#handleDataChange(this.#point);
    document.removeEventListener('keydown', this.#onDocumentKeydown);
  }
}
