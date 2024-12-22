import NewForm from './../view/create-form.js';
import {render, RenderPosition, remove} from './../framework/render.js';
import {nanoid} from 'nanoid';
import {UserAction, UpdateType} from '../const.js';
import Observable from './../framework/observable.js';

export default class NewPointPresenter extends Observable {
  #btnNewPoint = null;
  #newForm = null;
  #mainContainer = null;
  #handlerDataChange = null;
  #handlerDestroy = null;
  #handlerErroNewForm = null;
  #handlerRemoveCurrentError = null;
  #cities = null;
  #destinations = null;
  #offers = null;

  constructor({mainContainer, onDataChange, onDestroy, onErrorForm, onRemoveErrorForm}) {
    super();
    this.#mainContainer = mainContainer;
    this.#handlerDataChange = onDataChange;
    this.#handlerDestroy = onDestroy;
    this.#handlerErroNewForm = onErrorForm;
    this.#handlerRemoveCurrentError = onRemoveErrorForm;
  }

  init(cities, destinations, offers) {

    this.#cities = cities;
    this.#destinations = destinations;
    this.#offers = offers;

    if (this.#newForm !== null) {
      return;
    }

    this.#newForm = new NewForm({
      onFormSubmit: this.#handlerFormSubmit,
      onFormReset: this.#handlerDeleteClick,
      onErrorForm: this.#handlerErrorForm,
      onRemoveErrorForm: this.#handlerRemoveErrorForm,
      cities: this.#cities,
      destinations: this.#destinations,
      offers: this.#offers,
    });

    render(this.#newForm, this.#mainContainer, RenderPosition.AFTERBEGIN);
    this.#newForm._restoreHandlers();
    this.#newForm._setDatepicker();
    this.#newForm.isOpen = true;
    document.addEventListener('keydown', this.#newForm._handlerEscResetForm);
  }

  destroy() {
    if (this.#newForm === null) {
      return;
    }

    this.#handlerDestroy();

    remove(this.#newForm);
    this.#newForm = null;
  }

  #handlerFormSubmit = (evt) => {
    this.#handlerDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {id: nanoid(),...evt}
    );
    this.destroy();
  };

  #handlerDeleteClick = () => {
    this.#newForm.isOpen = false;
    this.#newForm._removeDatepicker();
    this.destroy();
  };

  #handlerErrorForm = (container, thisTextContent) => {
    this.#handlerErroNewForm(container, thisTextContent);
  };

  #handlerRemoveErrorForm = () => {
    this.#handlerRemoveCurrentError();
  };
}
