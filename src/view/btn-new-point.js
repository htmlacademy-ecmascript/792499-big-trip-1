import AbstractView from './../framework/view/abstract-view.js';

export default class BtnNewPoint extends AbstractView {
  #newEventBtnHandler = null;
  #headerMain = null;

  constructor({onClick, headerMain}) {
    super();
    this.#newEventBtnHandler = onClick;
    this.#headerMain = headerMain;
    this.buttonNewEvent.addEventListener('click', this.#btnClickHandler);
  }

  get buttonNewEvent() {
    return this.#headerMain.querySelector('.trip-main__event-add-btn');
  }

  #btnClickHandler = (evt) => {
    evt.preventDefault();
    this.#newEventBtnHandler();
    this.buttonNewEvent.disabled = true;
  };

  formCloseHandler() {
    this.buttonNewEvent.disabled = false;
  }
}
