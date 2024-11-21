import {humanizePointDueDate, handlerOffers} from './../utils/points.js';
import AbstractStatefulView from './../framework/view/abstract-stateful-view.js';
import {OFFERS, EVENT_TYPES, OFFER_TYPES, CITIES, DESTINATION_CITIES, BasicValues, NewPoint, TooltipLabel} from './../const.js';
import {isEscapeKey, checkingForms, capitalize} from './../utils/common.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const createForm = (point) => {
  const {isPrice, isEventType, isOffers, isCity, isDescription, isPictures, ...rest} = point;
  const {offers} = isOffers;

  const createImgMarkup = (dataMarkup) => Object.entries(dataMarkup).map(([, value]) => `<img class="event__photo" src="${value.src}.jpg" alt="${value.description}">`).join('');
  const createMarkup = (dataMarkup) => Object.entries(dataMarkup).map(([, value]) => `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${value.id}" type="checkbox" name="${value.title}" ${rest[BasicValues.CHECKED + value.id]}>
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
            ${createEventType(isEventType, EVENT_TYPES)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${isEventType}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${isCity}" autocomplete="off" list="destination-list-1" required>
        <datalist id="destination-list-1">
          ${createCities(CITIES)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="" required>
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="" required>
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${isPrice}" autocomplete="off" required>
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
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

export default class NewForm extends AbstractStatefulView {
  #handlerFormClick = null;
  #handlerFormReset = null;
  #handlerErrorForm = null;
  #handlerRemoveErrorForm = null;
  #datepickerStart = null;
  #datepickerEnd = null;
  #point = null;
  #currentAttribute = null;
  #currentOffersValue = null;

  constructor({onFormSubmit, onFormReset, onErrorForm, onRemoveErrorForm}) {
    super();
    this.#point = NewPoint;
    this._setState(NewForm.parsePointToState(this.#point));
    this.#handlerFormClick = onFormSubmit;
    this.#handlerFormReset = onFormReset;
    this.#handlerErrorForm = onErrorForm;
    this.#handlerRemoveErrorForm = onRemoveErrorForm;
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
    return createForm(this._state);
  }

  get eventStartTime() {
    return this.element.querySelector('#event-start-time-1');
  }

  get eventEndTime() {
    return this.element.querySelector('#event-end-time-1');
  }

  _removeDatepicker() {
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
    this.currentForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.#handlerBtnSubmit();
    });
    this.resetBtn.addEventListener('click', this._handlerResetForm);
    this.eventTypeGroup.addEventListener('change', this.#handlerEventType);
    this.city.addEventListener('change', this.#handlerDestinationPoint);
    this.price.addEventListener('change', this.#handlerPriceInput);
    this.offers.forEach((offer) => {
      offer.addEventListener('change', this.#creatingActualOffers);
      offer.addEventListener('change', this.#handlerCurrentOffers);
    });
  }

  #handlerRemoveElements = () => {
    this.#handlerFormReset();
    document.removeEventListener('keydown', this._handlerEscResetForm);
  };

  #handlerBtnSubmit = () => {

    if (!this._state.dateFrom) {
      checkingForms.styleError(this.eventStartTime, this.eventStartTime.parentElement);
      this.#handlerErrorForm(this.eventStartTime.parentElement, TooltipLabel.DATE);
      return;
    }

    if (!this._state.dateTo) {
      checkingForms.styleError(this.eventEndTime, this.eventEndTime.parentElement);
      this.#handlerErrorForm(this.eventEndTime.parentElement, TooltipLabel.DATE);
      return;
    }

    this.updateElement(this._state.isOffers.offers = this.#creatingActualOffers());
    this.#handlerFormClick(NewForm.parseStateToPoint(this._state));
    this._removeDatepicker();
    document.removeEventListener('keydown', this._handlerEscResetForm);
  };

  _handlerEscResetForm = (evt) => {
    if (isEscapeKey(evt) && this.isOpen && !evt.target.classList.contains('event__input--time')) {
      evt.preventDefault();
      this._handlerResetForm();
    }
  };

  _handlerResetForm = () => {
    this.updateElement(NewForm.parsePointToState(this.#point));
    this.#handlerRemoveElements();
  };

  #handlerEventType = (evt) => {
    this._removeDatepicker();
    if (evt.target.classList.contains('event__type-input')) {
      evt.preventDefault();
      handlerOffers(this._state.offer.offers, this._state, BasicValues.UNCHECKED);
      this.updateElement({
        isEventType: evt.target.value,
        isOffers: OFFER_TYPES.find((item) => item.type === evt.target.value),
      });
      this.eventStartTime.value = humanizePointDueDate(this._state.dateFrom).allDate;
      this.eventEndTime.value = humanizePointDueDate(this._state.dateTo).allDate;
    }

    this._setDatepicker();
  };

  #handlerDestinationPoint = (evt) => {
    this._removeDatepicker();
    evt.preventDefault();

    let currentValue;
    DESTINATION_CITIES.find((item) => {
      if (item.name === evt.target.value) {
        currentValue = item.name;

        this.updateElement({
          isCity: item.name,
          isDescription: item.description,
          isPictures: item.pictures,
        });
      }

      if (this._state.dateFrom) {
        this.eventStartTime.value = humanizePointDueDate(this._state.dateFrom).allDate;
      }

      if (this._state.dateTo) {
        this.eventEndTime.value = humanizePointDueDate(this._state.dateTo).allDate;
      }

    });

    if (evt.target.value !== currentValue) {
      checkingForms.styleError(this.city, this.city.parentElement);
      this.#handlerErrorForm(this.city.parentElement, TooltipLabel.CITY);
    }

    this._setDatepicker();
  };

  #handlerCurrentOffers = (evt) => {
    this.#currentAttribute = BasicValues.CHECKED + evt.target.id.at(-1);
    this.#currentOffersValue = evt.target.checked;
    this._state[this.#currentAttribute] = this.#currentOffersValue ? BasicValues.CHECKED : BasicValues.UNCHECKED;
  };

  #handlerPriceInput = (evt) => {
    if (!Number(evt.target.value)) {
      checkingForms.styleError(this.price, this.price.parentElement);
      this.#handlerErrorForm(this.price.parentElement, TooltipLabel.NUMBER);
    } else {
      this.price.value = Math.floor(evt.target.value);
      checkingForms.priceInputCorrect(this.price, evt.target.value);
      this._state.isPrice = evt.target.value;
      this.#handlerRemoveErrorForm();
    }
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

  #handlerDateFromChange = ([selectedDate]) => {
    this.eventStartTime.value = humanizePointDueDate(selectedDate).allDate;
    this._state.dateFrom = humanizePointDueDate(selectedDate).datepicker;
    //this.eventStartTime.parentElement.querySelector('.tooltip') ? this.#handlerRemoveErrorForm() : ' ';
  };

  #handlerDateToChange = ([selectedDate]) => {
    this.eventEndTime.value = humanizePointDueDate(selectedDate).allDate;
    this._state.dateTo = humanizePointDueDate(selectedDate).datepicker;
    this.#handlerRemoveErrorForm();
  };

  #handlerDateOptions = () => {
    this.#datepickerEnd.set('minDate', humanizePointDueDate(this._state.dateFrom).allDate);
    this.eventEndTime.value = ' ';
  };

  _setDatepicker() {
    const [inputStartTime, inputEndTime] = this.element.querySelectorAll('.event__input--time');
    this.#datepickerStart = flatpickr(inputStartTime, {
      enableTime: true,
      'time_24hr': true,
      dateFormat: 'y/m/d H:i',
      minDate: humanizePointDueDate(new Date()).allDate,
      locale: {
        firstDayOfWeek: 1,
      },
      onValueUpdate: this.#handlerDateFromChange,
      onClose: this.#handlerDateOptions,
    });

    this.#datepickerEnd = flatpickr(inputEndTime, {
      enableTime: true,
      'time_24hr': true,
      dateFormat: 'y/m/d H:i',
      minDate: humanizePointDueDate(new Date()).allDate,
      locale: {
        firstDayOfWeek: 1,
      },
      onValueUpdate: this.#handlerDateToChange,
    });
  }

  static parsePointToState(point) {

    const currentForm = {
      ...point,
      isPrice: point.basePrice,
      isEventType: point.event,
      isOffers: point.offer,
      isCity: point.destination.name,
      isDescription: point.destination.description,
      isPictures: point.destination.pictures,
    };

    const offersArray = Object.entries(point.offer.offers).map(([,value]) => value.id);

    offersArray.forEach((el) => {
      currentForm[BasicValues.CHECKED + el] = BasicValues.CHECKED + el;
    });

    return currentForm;
  }

  static parseStateToPoint(state) {
    const point = {...state};

    point.basePrice = state.isPrice;
    point.event = state.isEventType;
    point.img = state.isEventType;
    point.offer = state.isOffers;
    point.destination.name = state.isCity;
    point.destination.description = state.isDescription;
    point.destination.pictures = state.isPictures;

    delete point.isEventType;
    delete point.isOffers;
    delete point.isCity;
    delete point.isDescription;
    delete point.isPictures;
    delete point.isPrice;

    return point;
  }
}
