import AbstractView from './../framework/view/abstract-view.js';

export default class BtnNewPoint extends AbstractView {
  #handlerNewEventBtn = null;
  #headerMain = null;

  constructor({onClick, headerMain}) {
    super();
    this.#handlerNewEventBtn = onClick;
    this.#headerMain = headerMain;
    this.buttonNewEvent.addEventListener('click', this.#handlerBtnClick);
  }

  get buttonNewEvent() {
    return this.#headerMain.querySelector('.trip-main__event-add-btn');
  }

  #handlerBtnClick = (evt) => {
    evt.preventDefault();
    this.#handlerNewEventBtn();
    this.buttonNewEvent.disabled = true;
  };

  _handlerFormClose() {
    this.buttonNewEvent.disabled = false;
  }
}
