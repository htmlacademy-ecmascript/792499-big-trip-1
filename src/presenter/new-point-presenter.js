import NewForm from './../view/create-form.js';
import {render, RenderPosition, remove} from './../framework/render.js';
import {UserAction, UpdateType} from '../const.js';
import Observable from './../framework/observable.js';

export default class NewPointPresenter extends Observable {
  #newForm = null;
  #mainContainer = null;
  #dataChangeHandler = null;
  #destroyHandler = null;
  #erroNewFormHandler = null;
  #removeCurrentErrorHandler = null;
  #cities = null;
  #destinations = null;
  #offers = null;

  constructor({mainContainer, onDataChange, onDestroy, onErrorForm, onRemoveErrorForm}) {
    super();
    this.#mainContainer = mainContainer;
    this.#dataChangeHandler = onDataChange;
    this.#destroyHandler = onDestroy;
    this.#erroNewFormHandler = onErrorForm;
    this.#removeCurrentErrorHandler = onRemoveErrorForm;
  }

  init(cities, destinations, offers) {
    this.#cities = cities;
    this.#destinations = destinations;
    this.#offers = offers;

    if (this.#newForm !== null) {
      return;
    }

    this.#newForm = new NewForm({
      onFormSubmit: this.#formSubmitHandler,
      onFormReset: this.#deleteClickHandler,
      onErrorForm: this.#errorFormHandler,
      onRemoveErrorForm: this.#removeErrorFormHandler,
      cities: this.#cities,
      destinations: this.#destinations,
      offers: this.#offers,
    });

    render(this.#newForm, this.#mainContainer, RenderPosition.AFTERBEGIN);
    this.#newForm.getRestoringHandlers();
    this.#newForm.setDatepicker();
    this.#newForm.isOpen = true;
    document.addEventListener('keydown', this.#newForm.escResetFormHandler);
  }

  destroy() {
    if (this.#newForm === null) {
      return;
    }

    this.#destroyHandler();

    remove(this.#newForm);
    this.#newForm = null;
  }

  setSaving() {
    this.#newForm.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#newForm.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#newForm.shake(resetFormState);
  }

  #formSubmitHandler = (evt) => {
    this.#dataChangeHandler(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      evt,
    );
    this.destroy();
  };

  #deleteClickHandler = () => {
    this.#newForm.isOpen = false;
    this.#newForm.removeDatepicker();
    this.destroy();
  };

  #errorFormHandler = (container, thisTextContent) => {
    this.#erroNewFormHandler(container, thisTextContent);
  };

  #removeErrorFormHandler = () => {
    this.#removeCurrentErrorHandler();
  };
}
