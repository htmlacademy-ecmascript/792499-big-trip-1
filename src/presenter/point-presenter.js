import Point from './../view/point.js';
import EditForm from './../view/edit-form.js';
import {replace, render, remove} from './../framework/render.js';
import {Mode} from './../const.js';

export default class PointPresenter {
  #currentPoint = null;
  #currentForm = null;
  #mainContainer = null;
  #handlerDataChange = null;
  #handlerModeChange = null;
  #point = null;
  #mode = Mode.DEFAULT;

  constructor({container, onDataChange, onModeChange}) {
    this.#mainContainer = container;
    this.#handlerDataChange = onDataChange;
    this.#handlerModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;
    const prevCurrentPoint = this.#currentPoint;
    const prevCurrentForm = this.#currentForm;

    this.#currentPoint = new Point({
      point: this.#point,
      onRollupClick: this.#handlerRollupClick,
      onFavoriteClick: this.#handlerFavoriteClick,
    });

    this.#currentForm = new EditForm({
      point: this.#point,
      onFormSubmit: this.#handlerFormSubmit,
      onFormReset: this.#handlerFormReset,
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
    this.#handlerModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint() {
    replace(this.#currentPoint, this.#currentForm);
    this.#mode = Mode.DEFAULT;
  }

  #handlerRollupClick = () => {
    this.#replacePointToForm();
    this.#currentForm.isOpen = true;
    this.#currentForm._restoreHandlers();
    this.#currentForm._setDatepicker();
    document.addEventListener('keydown', this.#currentForm._handlerEscResetForm);
  };

  #handlerFavoriteClick = () => {
    this.#handlerDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #handlerFormReset = () => {
    this.#currentForm.isOpen = false;
    this.#replaceFormToPoint();
    this.#currentForm._removeDatepicker();
  };

  #handlerFormSubmit = (evt) => {
    this.#handlerDataChange(evt);
  };
}
