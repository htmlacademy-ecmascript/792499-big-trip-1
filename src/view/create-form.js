import AbstractStatefulView from './../framework/view/abstract-view.js';
import {OFFER_TYPES, DESTINATION_CITIES} from './../const.js';

const createForm = (point) => {
  const {event, img} = point;
  return `<form class="event event--edit" action="#" method="post">
            <header class="event__header">
              <div class="event__type-wrapper">
                <label class="event__type  event__type-btn" for="event-type-toggle-1">
                  <span class="visually-hidden">Choose event type</span>
                  <img class="event__type-icon" width="17" height="17" src="img/icons/${img}.png" alt="Event type icon">
                </label>
                <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                <div class="event__type-list">
                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Event type</legend>

                    <div class="event__type-item">
                      <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                      <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                      <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                      <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                      <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                      <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                      <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                      <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                      <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                    </div>

                    <div class="event__type-item">
                      <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                      <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                    </div>
                  </fieldset>
                </div>
              </div>

              <div class="event__field-group  event__field-group--destination">
                <label class="event__label  event__type-output" for="event-destination-1">
                  ${event}
                </label>
                <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="" list="destination-list-1">
                <datalist id="destination-list-1">
                  <option value="Amsterdam"></option>
                  <option value="Geneva"></option>
                  <option value="Chamonix"></option>
                </datalist>
              </div>

              <div class="event__field-group  event__field-group--time">
                <label class="visually-hidden" for="event-start-time-1">From</label>
                <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="19/03/19 00:00">
                &mdash;
                <label class="visually-hidden" for="event-end-time-1">To</label>
                <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="19/03/19 00:00">
              </div>

              <div class="event__field-group  event__field-group--price">
                <label class="event__label" for="event-price-1">
                  <span class="visually-hidden">Price</span>
                  &euro;
                </label>
                <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
              </div>

              <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
              <button class="event__reset-btn" type="reset">Cancel</button>
            </header>
            <section class="event__details">
              <section class="event__section  event__section--offers">
                <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                <div class="event__available-offers"></div>
              </section>

              <section class="event__section  event__section--destination">
                <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                <p class="event__destination-description"></p>

                <div class="event__photos-container"><div class="event__photos-tape">
                  </div>
                </div>
              </section>
            </section>
          </form>`;
};

export default class NewForm extends AbstractStatefulView {
  #handlerFormClick = null;

  constructor({point, onFormSubmit}) {
    super();
    this._setState(NewForm.parsePointToState(point));
    this.#handlerFormClick = onFormSubmit;

    this._restoreHandlers();
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

  get template() {
    return createForm(this._state);
  }

  _restoreHandlers() {
    this.currentForm.addEventListener('submit', this.#handlerBtnClick);
    this.eventTypeGroup.addEventListener('click', this.#handlerEventType);
    this.eventTypeCity.addEventListener('change', this.#handlerDestinationPoint);
  }

  #handlerBtnClick = (evt) => {
    evt.preventDefault();

    this.#handlerFormClick(NewForm.parseStateToPoint(this._state));
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
