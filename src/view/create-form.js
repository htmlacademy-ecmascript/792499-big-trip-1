import {humanizePointDueDate} from './../utils/points.js';
import AbstractStatefulView from './../framework/view/abstract-stateful-view.js';
import {EVENT_TYPES, BasicValues, NewPoint, TooltipLabel} from './../const.js';
import {isEscapeKey, checkingForms, capitalize} from './../utils/common.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import dayjs from 'dayjs';

const createForm = (point, cities) => {

  const {isPrice, isEventType, isOffers, isCity, isDescription, isPictures, isDisabled, isSaving} = point;

  const createImgMarkup = (dataMarkup) => Object.entries(dataMarkup).map(([, value]) => `<img class="event__photo" src="${value.src}" alt="${value.description}">`).join('');
  const createMarkup = (dataMarkup) => Object.entries(dataMarkup).map(([, value]) => `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="${value.id}" type="checkbox" name="${value.title}" ${value.isChecked ? BasicValues.CHECKED : BasicValues.UNCHECKED} ${isDisabled ? 'disabled' : ' '}>
        <label class="event__offer-label" for="${value.id}">
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
  const createCities = (currentCities) => currentCities.map((city) => `<option value="${city}"></option>`).join('');

  return `<form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${isEventType}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ' '}>

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${createEventType(isEventType, EVENT_TYPES)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${isEventType}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${isCity}" autocomplete="off" list="destination-list-1" ${isDisabled ? 'disabled' : ' '} required>
        <datalist id="destination-list-1">
          ${createCities(cities)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="" required ${isDisabled ? 'disabled' : ' '}>
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="" required ${isDisabled ? 'disabled' : ' '}>
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${isPrice}" autocomplete="off" ${isDisabled ? 'disabled' : ' '} required>
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ' '}>${isSaving ? 'Saving' : 'Save'}</button>
      <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ' '}>Cancel</button>
    </header>
    <section class="event__details">
      ${(isOffers.length > BasicValues.ZERO ? `
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${createMarkup(isOffers)}
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

export default class NewForm extends AbstractStatefulView {
  #formClickHandler = null;
  #formResetHandler = null;
  #errorFormHandler = null;
  #removeErrorFormHandler = null;
  #datepickerStart = null;
  #datepickerEnd = null;
  #point = null;
  #currentOffersValue = null;
  #cities = null;
  #destinations = null;
  #offers = null;

  constructor({onFormSubmit, onFormReset, onErrorForm, onRemoveErrorForm, cities, destinations, offers}) {
    super();
    this.#point = NewPoint;
    this.#offers = offers.map((item) => item);
    this.#destinations = destinations;
    const currentOffers = [];

    this.#offers.forEach((element) => {
      if (element.type === this.#point.event) {
        currentOffers.push(element);
        return currentOffers;
      }
    });

    this.#point.offer = currentOffers;

    this._setState(NewForm.parsePointToState(this.#point));
    this.#formClickHandler = onFormSubmit;
    this.#formResetHandler = onFormReset;
    this.#errorFormHandler = onErrorForm;
    this.#removeErrorFormHandler = onRemoveErrorForm;
    this.#cities = cities;
  }

  get resetBtn() {
    return this.element.querySelector('.event__reset-btn');
  }

  get currentForm() {
    return this.element;
  }

  get offers() {
    return this.element.querySelectorAll('.event__offer-checkbox');
  }

  get eventTypeGroup() {
    return this.element.querySelector('.event__type-group');
  }

  get city() {
    return this.element.querySelector('.event__input--destination');
  }

  get price() {
    return this.element.querySelector('.event__input--price');
  }

  get description() {
    return this.element.querySelector('.event__destination-description');
  }

  get img() {
    return this.element.querySelector('.event__photo');
  }

  get template() {
    return createForm(this._state, this.#cities);
  }

  get eventStartTime() {
    return this.element.querySelector('#event-start-time-1');
  }

  get eventEndTime() {
    return this.element.querySelector('#event-end-time-1');
  }

  get time() {
    return this.element.querySelector('.event__input--time');
  }

  getRestoringHandlers () {
    return this._restoreHandlers();
  }

  removeDatepicker() {
    if (this.#datepickerStart) {
      this.#datepickerStart.destroy();
      this.#datepickerStart = null;
    }

    if (this.#datepickerEnd) {
      this.#datepickerEnd.destroy();
      this.#datepickerEnd = null;
    }
  }

  _restoreHandlers() {
    this.currentForm.addEventListener('submit', this.#btnSubmitHandler);
    this.resetBtn.addEventListener('click', this._handlerResetForm);
    this.eventTypeGroup.addEventListener('change', this.#eventTypeHandler);
    this.price.addEventListener('change', this.#priceInputHandler);
    this.city.addEventListener('change', this.#destinationPointHandler);
    this.offers.forEach((offer) => {
      offer.addEventListener('change', this.#creatingCurrentOffers);
    });
  }

  #removeElementsHandler = () => {
    this.#formResetHandler();
    document.removeEventListener('keydown', this.escResetFormHandler);
  };

  #btnSubmitHandler = (evt) => {
    evt.preventDefault();
    const datesDifferent = dayjs(this._state.dateTo).diff(dayjs(this._state.dateFrom));

    if (!this._state.dateFrom) {
      checkingForms.styleError(this.eventStartTime, this.eventStartTime.parentElement);
      this.#errorFormHandler(this.eventStartTime.parentElement, TooltipLabel.DATE);
      return;
    }

    if (!this._state.dateTo) {
      checkingForms.styleError(this.eventEndTime, this.eventEndTime.parentElement);
      this.#errorFormHandler(this.eventEndTime.parentElement, TooltipLabel.DATE);
      return;
    }

    if (!Number(this.price.value)) {
      checkingForms.styleError(this.price, this.price.parentElement);
      return this.#errorFormHandler(this.price.parentElement, TooltipLabel.NUMBER);
    }

    if (Number(this.price.value) > BasicValues.MAX_PRICE) {
      checkingForms.styleError(this.price, this.price.parentElement);
      return this.#errorFormHandler(this.price.parentElement, TooltipLabel.MAX_NUMBER);
    }

    if (datesDifferent === 0) {
      checkingForms.styleErrorDate(this.time.parentElement);
      return this.#errorFormHandler(this.time.parentElement, TooltipLabel.DATES_DIFF);
    }

    this.updateElement({
      isOffers: this._state.isOffers.map((item) => item.isChecked === true ? item.id : '')
        .filter((item) => item.length !== 0),
      isPrice: Math.floor(this.price.value),
    });

    this.#formClickHandler(NewForm.parseStateToPoint(this._state));
    this.removeDatepicker();
    document.removeEventListener('keydown', this.escResetFormHandler);
  };

  #creatingCurrentOffers = (evt) => {
    this.#currentOffersValue = evt.target.checked;
    this._state.isOffers.find((item) => {
      if (item.id === evt.target.id) {
        item.isChecked = this.#currentOffersValue;
      }
    });
  };

  escResetFormHandler = (evt) => {
    if (isEscapeKey(evt) && this.isOpen && !evt.target.classList.contains('event__input--time')) {
      evt.preventDefault();
      this._handlerResetForm();
    }
  };

  _handlerResetForm = () => {
    this.updateElement(NewForm.parsePointToState(this.#point));
    this.#removeElementsHandler();
  };

  #eventTypeHandler = (evt) => {
    this.removeDatepicker();
    const currentOffers = [];
    this.#offers.forEach((element) => {
      if (element.type === evt.target.value) {
        currentOffers.push(element);
      }
    });

    if (evt.target.classList.contains('event__type-input')) {
      evt.preventDefault();

      this.updateElement({
        isEventType: evt.target.value,
        isOffers: currentOffers,
      });

      this.#checksPickerFields();
    }

    if(!this._state.dateTo && !this._state.dateFrom) {
      this.setDatepicker();
    }
  };

  #destinationPointHandler = (evt) => {
    this.removeDatepicker();
    evt.preventDefault();

    let currentValue;
    this.#destinations.find((item) => {
      if (item.name === evt.target.value) {
        currentValue = item.name;
        this.updateElement({
          isCity: item.name,
          isDescription: item.description,
          isPictures: item.pictures,
          isDestinationId: item.id,
          isPrice: this._state.isPrice,
        });
      }

      this.#checksPickerFields();

    });

    if (evt.target.value !== currentValue) {
      checkingForms.styleError(this.city, this.city.parentElement);
      this.#errorFormHandler(this.city.parentElement, TooltipLabel.CITY);
    }

    if(!this._state.dateTo && !this._state.dateFrom) {
      this.setDatepicker();
    }

  };

  #priceInputHandler = (evt) => {
    this._state.isPrice = evt.target.value;
  };

  #dateFromChangeHandler = ([selectedDate]) => {
    this.eventStartTime.value = humanizePointDueDate(selectedDate).allDate;
    this._state.dateFrom = humanizePointDueDate(selectedDate).datepicker;
    this.#datepickerEnd.set('minDate', humanizePointDueDate(selectedDate).allDate);
    this.#removeErrorFormHandler();
  };

  #dateToChangeHandler = ([selectedDate]) => {
    this.eventEndTime.value = humanizePointDueDate(selectedDate).allDate;
    this._state.dateTo = humanizePointDueDate(selectedDate).datepicker;
    this.#datepickerStart.set('maxDate', humanizePointDueDate(selectedDate).allDate);
    this.#removeErrorFormHandler();
  };

  #checksPickerFields = () => {
    if (this._state.dateFrom) {
      this.setDatepicker();
      this.eventStartTime.value = humanizePointDueDate(this._state.dateFrom).allDate;
      this.#datepickerEnd.set('minDate', humanizePointDueDate(this._state.dateFrom).allDate);
    }

    if (this._state.dateTo) {
      this.setDatepicker();
      this.eventEndTime.value = humanizePointDueDate(this._state.dateTo).allDate;
      this.#datepickerStart.set('maxDate', humanizePointDueDate(this._state.dateTo).allDate);
    }
  };

  setDatepicker() {
    const [inputStartTime, inputEndTime] = this.element.querySelectorAll('.event__input--time');
    this.#datepickerStart = flatpickr(inputStartTime, {
      enableTime: true,
      'time_24hr': true,
      dateFormat: 'd/m/y H:i',
      locale: {
        firstDayOfWeek: BasicValues.ONE,
      },
      onClose: this.#dateFromChangeHandler,
    });

    this.#datepickerEnd = flatpickr(inputEndTime, {
      enableTime: true,
      'time_24hr': true,
      dateFormat: 'd/m/y H:i',
      locale: {
        firstDayOfWeek: BasicValues.ONE,
      },
      onClose: this.#dateToChangeHandler,
    });
  }

  static parsePointToState(point) {

    const currentForm = {
      ...point,
      isPrice: point.basePrice,
      isEventType: point.event,
      isOffers: point.offer,
      isCity: point.destinations.name,
      isDescription: point.destinations.description,
      isPictures: point.destinations.pictures,
      isDestination: point.destinations,
      isDestinationId: point.destinations.id,
      isChecked: '',
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
    delete point.checked;
    return currentForm;
  }

  static parseStateToPoint(state) {
    const point = {...state};
    point.basePrice = state.isPrice;
    point.type = state.isEventType;
    point.offer = state.isOffers;
    point.destinations.name = state.isCity;
    point.destinations.description = state.isDescription;
    point.destinations.pictures = state.isPictures;
    point.destinations.id = state.isDestinationId;
    point.dateTo = new Date(point.dateTo);
    point.dateFrom = new Date(point.dateFrom);

    delete point.event;
    delete point.isEventType;
    delete point.isOffers;
    delete point.isCity;
    delete point.isDescription;
    delete point.isPictures;
    delete point.isPrice;
    delete point.isDestinationId;
    delete point.isDestination;
    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;
    delete point.isChecked;

    return point;
  }
}
