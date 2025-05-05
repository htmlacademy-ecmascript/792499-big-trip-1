import Point from './../view/point.js';
import EditForm from './../view/edit-form.js';
import {replace, render, remove} from './../framework/render.js';
import {Mode, UserAction, UpdateType} from './../const.js';
import Observable from './../framework/observable.js';

export default class PointPresenter extends Observable {
  #currentPoint = null;
  #currentForm = null;
  #mainContainer = null;
  #dataChangeHandler = null;
  #modeChangeHandler = null;
  #point = null;
  #destinations = null;
  #offers = null;
  #cities = null;
  #mode = Mode.DEFAULT;
  #currentErrorFormHandler = null;

  constructor({container, onDataChange, onModeChange, onCurrentErrorForm}) {
    super();
    this.#mainContainer = container;
    this.#dataChangeHandler = onDataChange;
    this.#modeChangeHandler = onModeChange;
    this.#currentErrorFormHandler = onCurrentErrorForm;
  }

  init(point, destinations, offers, cities) {
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#cities = cities;

    const prevCurrentPoint = this.#currentPoint;
    const prevCurrentForm = this.#currentForm;

    this.#currentPoint = new Point({
      point: this.#point,
      onRollupClick: this.#rollupClickHandler,
      onFavoriteClick: this.#favoriteClickHandler,
    });

    this.#currentForm = new EditForm({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      cities: this.#cities,
      onFormSubmit: this.#formSubmitHandler,
      onFormReset: this.#formResetHandler,
      onFormDelete: this.#deletePointHandler,
      onErrorForm: this.#errorFormHandler,
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
      return this.#mode === Mode.DEFAULT;
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

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#currentForm.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#currentForm.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#currentPoint.shake();
      return;
    }

    const resetFormState = () => {
      this.#currentForm.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#currentForm.shake(resetFormState);
  }

  #replacePointToForm() {
    replace(this.#currentForm, this.#currentPoint);
    this.#modeChangeHandler();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint() {
    replace(this.#currentPoint, this.#currentForm);
    this.#mode = Mode.DEFAULT;
  }

  #rollupClickHandler = () => {
    this.#replacePointToForm();
    this.#currentForm.isOpen = true;
    this.#currentForm.restoringHandlers;
    this.#currentForm.setDatepicker();
    document.addEventListener('keydown', this.#currentForm.escResetFormHandler);
  };

  #favoriteClickHandler = () => {
    this.#dataChangeHandler(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {...this.#point, isFavorite: !this.#point.isFavorite},
    );
  };

  #formResetHandler = () => {
    this.#currentForm.isOpen = false;
    this.#replaceFormToPoint();
    this.#currentForm.removeDatepicker();
  };

  #formSubmitHandler = (evt) => {
    this.#dataChangeHandler(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      evt,
    );
  };

  #errorFormHandler = (container, thisTextContent) => {
    this.#currentErrorFormHandler(container, thisTextContent);
  };

  #deletePointHandler = (evt) => {
    this.#dataChangeHandler(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      evt,
    );
  };
}
