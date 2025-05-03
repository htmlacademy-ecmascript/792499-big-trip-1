import {humanizePointDueDate, handlerOffers} from './../utils/points.js';
import {EVENT_TYPES, TooltipLabel, BasicValues} from './../const.js';
import {isEscapeKey, capitalize, checkingForms} from './../utils/common.js';
import AbstractStatefulView from './../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const createEditPoint = (point, cities) => {
  const currentCities = Array.from(new Set(cities));
  const {isPrice, dateFrom, dateTo, isEventType, isOffers, isCity, isDescription, isPictures, isDisabled, isSaving, isDeleting, ...rest} = point;

  const createImgMarkup = (dataMarkup) => Object.entries(dataMarkup).map(([, value]) => `<img class="event__photo" src="${value.src}" alt="${value.description}">`).join('');
  const createMarkup = (dataMarkup) => Object.entries(dataMarkup).map(([, value]) => `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="${value.id}" type="checkbox" name="${value.title}" ${rest[BasicValues.CHECKED + value.id]} ${isDisabled ? 'disabled' : ' '}>
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
  const createCities = (places) => places.map((city) => `<option value="${city}"></option>`).join('');

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
          ${createCities(currentCities)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizePointDueDate(dateFrom).allDate}" ${isDisabled ? 'disabled' : ' '}>
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizePointDueDate(dateTo).allDate}" ${isDisabled ? 'disabled' : ' '}>
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${isPrice}" autocomplete="off" maxlength="6" ${isDisabled ? 'disabled' : ' '}>
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ' '}>${isSaving ? 'Saving' : 'Save'}</button>
      <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ' '}>${isDeleting ? 'Deleting' : 'Delete'}</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
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

export default class EditForm extends AbstractStatefulView {
  #handlerFormClick = null;
  #handlerFormReset = null;
  #handlerDeleteThisPoint = null;
  #handlerErrorForm = null;
  #datepickerStart = null;
  #datepickerEnd = null;
  #point = null;
  #destinations = null;
  #offers = null;
  #cities = null;
  #currentAttribute = null;
  #currentOffersValue = null;

  constructor({point, destinations, offers, cities, onFormSubmit, onFormReset, onFormDelete, onErrorForm}) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#cities = cities;
    this._setState(EditForm.parsePointToState(point, destinations));
    this.#handlerFormClick = onFormSubmit;
    this.#handlerFormReset = onFormReset;
    this.#handlerDeleteThisPoint = onFormDelete;
    this.#handlerErrorForm = onErrorForm;
  }

  get rollupBtn() {
    return this.element.querySelector('.event__rollup-btn');
  }

  get deleteBtn() {
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

  get template() {
    return createEditPoint(this._state, this.#cities);
  }

  get city() {
    return this.element.querySelector('.event__input--destination');
  }

  get price() {
    return this.element.querySelector('.event__input--price');
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
    this.currentForm.addEventListener('submit', this.#handlerBtnSubmit);
    this.rollupBtn.addEventListener('click', this.#handlerResetForm);
    this.deleteBtn.addEventListener('click', this.#handlerDeletePoint);
    this.eventTypeGroup.addEventListener('change', this.#handlerEventType);
    this.city.addEventListener('change', this.#handlerDestinationPoint);
    this.offers.forEach((offer) => {
      offer.addEventListener('change', this.#creatingActualOffers);
      offer.addEventListener('change', this.#handlerCurrentOffers);
    });
  }

  #handlerRemoveElements = () => {
    this.#handlerFormReset();
    document.removeEventListener('keydown', this._handlerEscResetForm);
  };

  #handlerBtnSubmit = (evt) => {
    evt.preventDefault();
    if (!Number(this.price.value)) {
      checkingForms.styleError(this.price, this.price.parentElement);
      return this.#handlerErrorForm(this.price.parentElement, TooltipLabel.NUMBER);
    }

    if (Number(this.price.value) > BasicValues.MAX_PRICE) {
      checkingForms.styleError(this.price, this.price.parentElement);
      return this.#handlerErrorForm(this.price.parentElement, TooltipLabel.MAX_NUMBER);
    }

    this.updateElement({
      isOffers: this.#creatingActualOffers(),
      isPrice: Math.floor(this.price.value),
    });
    this.#handlerFormClick(EditForm.parseStateToPoint(this._state));
  };

  _handlerEscResetForm = (evt) => {
    if (isEscapeKey(evt) && this.isOpen && !evt.target.classList.contains('event__input--time')) {
      evt.preventDefault();
      this.#handlerResetForm();
    }
  };

  #handlerResetForm = () => {
    this.updateElement(EditForm.parsePointToState(this.#point, this.#destinations));
    this.#handlerRemoveElements();
  };

  #handlerDeletePoint = () => {
    this.#handlerDeleteThisPoint(this.#point);
  };

  #handlerEventType = (evt) => {
    this._removeDatepicker();
    const currentOffers = [];
    this.#offers.forEach((el) => {
      if (el.type === evt.target.value) {
        currentOffers.push(el);
      }
    });

    if (evt.target.classList.contains('event__type-input')) {
      evt.preventDefault();
      handlerOffers(currentOffers, this._state, BasicValues.UNCHECKED);
      this.updateElement({
        isEventType: evt.target.value,
        isOffers: currentOffers,
      });
    }
    this._setDatepicker();
  };

  #handlerDestinationPoint = (evt) => {
    this._removeDatepicker();

    let currentValue;

    this.#destinations.find((item) => {
      if (item.name === evt.target.value) {
        currentValue = item.name;
        this.updateElement({
          isCity: item.name,
          isDescription: item.description,
          isPictures: item.pictures,
        });
      }
    });

    if (evt.target.value !== currentValue) {
      checkingForms.styleError(this.city, this.city.parentElement);
      this.#handlerErrorForm(this.city.parentElement, TooltipLabel.CITY);
    }

    this._setDatepicker();
  };

  #handlerCurrentOffers = (evt) => {
    this.#currentAttribute = BasicValues.CHECKED + evt.target.id;
    this.#currentOffersValue = evt.target.checked;
    this._state[this.#currentAttribute] = this.#currentOffersValue ? BasicValues.CHECKED : BasicValues.UNCHECKED;
  };

  #handlerOfferChecked = (currentClass) => Array.from(this.element.querySelectorAll(currentClass)).
    filter((item) => item.checked).
    map((item) => item.getAttribute('id'));

  #creatingActualOffers = () => {
    const currentOffers = [];
    this.#handlerOfferChecked('.event__offer-checkbox').forEach((el) => {
      currentOffers.push(this._state.isOffers.find((item) => item.id === el));
    });

    return currentOffers;
  };

  #handlerDateFromChange = ([selectedDate]) => {
    this._state.dateFrom = humanizePointDueDate(selectedDate).datepicker;
    this.#datepickerEnd.set('minDate', humanizePointDueDate(this._state.dateFrom).allDate);
  };

  #handlerDateToChange = ([selectedDate]) => {
    this._state.dateTo = humanizePointDueDate(selectedDate).datepicker;
    this.#datepickerStart.set('maxDate', humanizePointDueDate(this._state.dateTo).allDate);
  };

  _setDatepicker() {
    const [inputStartTime, inputEndTime] = this.element.querySelectorAll('.event__input--time');
    this.#datepickerStart = flatpickr(inputStartTime, {
      enableTime: true,
      'time_24hr': true,
      dateFormat: 'y/m/d H:i',
      minDate: humanizePointDueDate(new Date()).allDate,
      locale: {
        firstDayOfWeek: BasicValues.ONE,
      },
      onClose: this.#handlerDateFromChange,
    });

    this.#datepickerEnd = flatpickr(inputEndTime, {
      enableTime: true,
      'time_24hr': true,
      dateFormat: 'y/m/d H:i',
      minDate: humanizePointDueDate(this._state.dateTo).allDate,
      locale: {
        firstDayOfWeek: BasicValues.ONE,
      },
      onClose: this.#handlerDateToChange,
    });
  }

  static parsePointToState(point) {
    const currentForm = {
      ...point,
      isPrice: point.basePrice,
      isEventType: point.type,
      isOffers: point.offer,
      isCity: point.destinations.name,
      isDescription: point.destinations.description,
      isPictures: point.destinations.pictures,
      isDestination: point.destinations,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };

    handlerOffers(point.offer, currentForm, BasicValues.CHECKED);

    return currentForm;
  }

  static parseStateToPoint(state) {
    const point = {...state};

    point.basePrice = state.isPrice;
    point.type = state.isEventType;
    point.offer = state.isOffers;
    point.destinations = state.isDestination;
    point.destinations.name = state.isCity;
    point.destinations.description = state.isDescription;
    point.destinations.pictures = state.isPictures;
    point.dateTo = new Date(point.dateTo);
    point.dateFrom = new Date(point.dateFrom);

    delete point.isEventType;
    delete point.isOffers;
    delete point.isCity;
    delete point.isDescription;
    delete point.isPictures;
    delete point.isPrice;
    delete point.isDestination;
    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    for (const key in point) {
      if (point[key] === ' ' || point[key] === 'checked') {
        delete point[key];
      }
    }

    return point;
  }
}
