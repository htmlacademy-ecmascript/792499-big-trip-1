import NewForm from './../view/create-form.js';
import {render, RenderPosition, remove} from './../framework/render.js';
import {nanoid} from 'nanoid';
import {UserAction, UpdateType} from '../const.js';

export default class NewPointPresenter {
  #btnNewPoint = null;
  #newForm = null;
  #mainContainer = null;
  #handlerDataChange = null;
  #handlerDestroy = null;
  #presenter = null;

  constructor({mainContainer, onDataChange, onDestroy, presenter}) {
    this.#mainContainer = mainContainer;
    this.#handlerDataChange = onDataChange;
    this.#handlerDestroy = onDestroy;
    this.#presenter = presenter;
  }

  init() {

    if (this.#newForm !== null) {
      return;
    }

    this.#newForm = new NewForm({
      onFormSubmit: this.#handlerFormSubmit,
      onFormReset: this.#handlerDeleteClick,
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
}
