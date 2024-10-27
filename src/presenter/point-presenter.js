import Point from './../view/point.js';
import EditForm from './../view/edit-form.js';
import Tooltip from './../view/tooltip.js';
import {replace, render, remove} from './../framework/render.js';
import {Mode, UserAction, UpdateType} from './../const.js';
import Observable from './../framework/observable.js';

export default class PointPresenter extends Observable {
  #currentPoint = null;
  #currentForm = null;
  #tooltip = null;
  #mainContainer = null;
  #handlerDataChange = null;
  #handlerModeChange = null;
  #point = null;
  #mode = Mode.DEFAULT;
  #newPointPresenter = null;

  constructor({container, onDataChange, onModeChange, newPointPresenter}) {
    super();
    this.#mainContainer = container;
    this.#handlerDataChange = onDataChange;
    this.#handlerModeChange = onModeChange;
    this.#newPointPresenter = newPointPresenter;

    this.#newPointPresenter.addObserver(this.#handlerErrorForm);
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
      onFormDelete: this.#handlerDeletePoint,
      onErrorForm: this.#handlerErrorForm,
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
    this.#handlerDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {...this.#point, isFavorite: !this.#point.isFavorite},
    );
  };

  #handlerFormReset = () => {
    this.#currentForm.isOpen = false;
    this.#replaceFormToPoint();
    this.#currentForm._removeDatepicker();
  };

  #handlerFormSubmit = (evt) => {
    this.#handlerDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      evt,
    );
  };

  #handlerErrorForm = (container, thisTextContent) => {
    this.#tooltip = new Tooltip({
      textContent: thisTextContent,
    });

    render(this.#tooltip, container);
  };

  #handlerDeletePoint = (evt) => {
    this.#handlerDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      evt,
    );
  };
}
