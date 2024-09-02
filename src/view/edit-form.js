import {humanizePointDueDate} from './../utils/points.js';
import {OFFERS, EVENT_TYPES, OFFER_TYPES, CITIES, DESTINATION_CITIES, DifferenceTwoInputs} from './../const.js';
import {capitalize} from './../utils/common.js';
import AbstractStatefulView from './../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const createEditPoint = (point) => {
  const {basePrice, event, dateFrom, dateTo, isEventType, isOffers, isCity, isDescription, isPictures} = point;
  const {offers} = isOffers;

  const createImgMarkup = (dataMarkup) => Object.entries(dataMarkup).map(([, value]) => `<img class="event__photo" src="${value.src}.jpg" alt="${value.description}">`).join('');
  const createMarkup = (dataMarkup) => Object.entries(dataMarkup).map(([, value]) => `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${value.id}" type="checkbox" name="${value.title}" checked>
        <label class="event__offer-label" for="event-offer-${value.id}">
          <span class="event__offer-title">${value.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${value.price}</span>
        </label>
      </div>`).join('');
  const createEventType = (pointEvent, eventTypes) => eventTypes.map((type) =>
    `<div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${pointEvent === type ? 'checked' : ' '}>
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalize(type)}</label>
    </div>`).join('');
  const createCities = (cities) => cities.map((city) => `<option value="${city}"></option>`).join('');

  return `<form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${isEventType}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${createEventType(event, EVENT_TYPES)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${isEventType}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${isCity}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${createCities(CITIES)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizePointDueDate(dateFrom).allDate}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizePointDueDate(dateTo).allDate}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      ${(offers.length > 0 ? `
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${createMarkup(offers)}
          </div>
        </section>` : ' ')}

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${isDescription}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${createImgMarkup(isPictures)}
          </div>
        </div>
      </section>
    </section>
  </form>`;
};

export default class EditForm extends AbstractStatefulView {
  #handlerFormClick = null;
  #datepickerStart = null;
  #datepickerEnd = null;

  constructor({point, onFormSubmit}) {
    super();
    this._setState(EditForm.parsePointToState(point));
    this.#handlerFormClick = onFormSubmit;

    this._restoreHandlers();
  }

  get rollupBtn() {
    return this.element.querySelector('.event__rollup-btn');
  }

  get currentForm() {
    return this.element;
  }

  get eventTypeGroup() {
    return this.element.querySelector('.event__type-group');
  }

  get eventTypeCity() {
    return this.element.querySelector('.event__input--destination');
  }

  get offersBlock() {
    return this.element.querySelector('.event__section--offers');
  }

  get offerElements() {
    return this.element.querySelector('.event__section--offers');
  }

  get offersElement() {
    return this.element.querySelector('.event__available-offers');
  }

  get inputStartTime() {
    return this.element.querySelector('#event-start-time-1');
  }

  get inputEndTime() {
    return this.element.querySelector('#event-end-time-1');
  }

  get template() {
    return createEditPoint(this._state);
  }

  _restoreHandlers() {
    this.currentForm.addEventListener('submit', this.#handlerBtnClick);
    this.rollupBtn.addEventListener('click', this.#handlerBtnClick);
    this.eventTypeGroup.addEventListener('click', this.#handlerEventType);
    this.eventTypeCity.addEventListener('change', this.#handlerDestinationPoint);
    this.#setDatepicker();
  }

  #handlerBtnClick = (evt) => {
    evt.preventDefault();
    this.updateElement(this._state.isOffers.offers = this.#creatingActualOffers());
    this.#handlerFormClick(EditForm.parseStateToPoint(this._state));
  };

  #handlerEventType = (evt) => {
    if (evt.target.classList.contains('event__type-input')) {
      evt.preventDefault();
      this.updateElement({
        isEventType: evt.target.value,
        isOffers: OFFER_TYPES.find((item) => item.type === evt.target.value),
      });
    }
  };

  #handlerDestinationPoint = (evt) => {
    evt.preventDefault();
    DESTINATION_CITIES.find((item) => {
      if (item.name === evt.target.value) {
        this.updateElement({
          isCity: item.name,
          isDescription: item.description,
          isPictures: item.pictures,
        });
      }
    });
  };

  #handlerOfferChecked = () => Array.from(this.element.querySelectorAll('.event__offer-checkbox')).
    filter((item) => item.checked).
    map((item) => item.getAttribute('id').at(-1));

  #creatingActualOffers = () => {
    const currentOffers = [];
    this.#handlerOfferChecked().forEach((el) => {
      currentOffers.push(OFFERS.find((item) => item.id === Number(el)));
    });
    return currentOffers;
  };

  #handlerDateChange = () => {
    /*const datepickerStartYear = this.#datepickerStart.latestSelectedDateObj.getFullYear();
    const datepickerStartMonth = this.#datepickerStart.latestSelectedDateObj.getMonth();
    const datepickerStartDay = this.#datepickerStart.latestSelectedDateObj.getDate();
    const datepickerStartHours = this.#datepickerStart.latestSelectedDateObj.getHours();*/
    //console.log(this.#datepickerEnd)
    /*const thisDate = new Date(Date.parse(this.#datepickerStart.selectedDates[0]));
    console.log(thisDate.getHours() + 1)*/
    this.#datepickerEnd.set({
      minDate: (this.#datepickerStart.selectedDates[0]),
      minTime: `${this.#datepickerStart.latestSelectedDateObj.getHours() + DifferenceTwoInputs}:${this.#datepickerStart.latestSelectedDateObj.getMinutes()}`,
      //defaultDate: `${this.#datepickerStart.latestSelectedDateObj.getFullYear()}/${this.#datepickerStart.latestSelectedDateObj.getMonth()}/${this.#datepickerStart.latestSelectedDateObj.getDate()}/${this.#datepickerStart.latestSelectedDateObj.getHours()}/${this.#datepickerStart.latestSelectedDateObj.getMinutes()}`,
    });
    //console.log(this.#datepickerEnd.selectedDates);
    //this.#datepickerEnd.config._minDate =`${datepickerStartYear}/${datepickerStartMonth}/${datepickerStartDay}/${datepickerStartHours}`;
  };

  #setDatepicker() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const day = new Date().getDate();
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    //console.log(minutes)
    this.#datepickerStart = flatpickr(this.inputStartTime, {
      enableTime: true,
      'time_24hr': true,
      dateFormat: 'y/m/d H:i',
      minDate: `today`,
      minTime: `${hours}:${minutes}`,
      onChange: this.#handlerDateChange,
    });

    this.#datepickerEnd = flatpickr(this.inputEndTime, {
      enableTime: true,
      'time_24hr': true,
      //defaultDate: this.inputEndTime.value,
      dateFormat: 'y/m/d H:i',
      minDate: 'today',
      onChange: this.#handlerDateChange,
    });
  }

  static parsePointToState(point) {
    return {
      ...point,
      isEventType: point.event,
      isOffers: point.offer,
      isCity: point.destination.name,
      isDescription: point.destination.description,
      isPictures: point.destination.pictures,
    };
  }

  static parseStateToPoint(state) {
    const point = {...state};

    point.event = point.isEventType;
    point.img = point.isEventType;
    point.offer = point.isOffers;
    point.destination.name = point.isCity;
    point.destination.description = point.isDescription;
    point.destination.pictures = point.isPictures;

    delete point.isEventType;
    delete point.isOffers;
    delete point.isCity;
    delete point.isDescription;
    delete point.isPictures;
    return point;
  }
}
