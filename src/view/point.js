import {humanizePointDueDate} from './../utils/points.js';
import AbstractView from './../framework/view/abstract-view.js';

const createNewPoint = (point) => {
  const {isFavorite, basePrice, type, destinations, offer, dateFrom, dateTo} = point;

  const createMarkup = (dataMarkup) => Object.entries(dataMarkup).map(([, value]) => {
    if (value.checked) {
      return `<li class="event__offer">
            <span class="event__offer-title">${value.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${value.price}</span>
          </li>`} else {
            return '';
          }
        }).join('');

  return `<div class="event">
            <time class="event__date" datetime="2019-03-18">${humanizePointDueDate(dateFrom).date}</time>
            <div class="event__type">
              <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
            </div>
            <h3 class="event__title">${type} ${destinations.name}</h3>
            <div class="event__schedule">
              <p class="event__time">
                <time class="event__start-time" datetime="2019-03-18T10:30">${humanizePointDueDate(dateFrom).time}</time>
                &mdash;
                <time class="event__end-time" datetime="2019-03-18T11:00">${humanizePointDueDate(dateTo).time}</time>
              </p>
              <p class="event__duration">${humanizePointDueDate(dateFrom, dateTo).difference()}</p>
            </div>
            <p class="event__price">
              &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
            </p>
            <h4 class="visually-hidden">Offers:</h4>
            <ul class="event__selected-offers">
              ${createMarkup(offer)}
            </ul>
            <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ' '}" type="button">
              <span class="visually-hidden">Add to favorite</span>
              <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
              </svg>
            </button>
            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>
          </div>`;
};

export default class Point extends AbstractView {
  #point = null;
  #rollupButtonHandler = null;
  #favoriteButtonHandler = null;

  constructor({point, onRollupClick, onFavoriteClick}) {
    super();
    this.#point = point;
    this.#rollupButtonHandler = onRollupClick;
    this.#favoriteButtonHandler = onFavoriteClick;

    this.buttonRollup.addEventListener('click', this.#rollupClickHandler);
    this.favoriteBtn.addEventListener('click', this.#favoriteClickHandler);
  }

  get buttonRollup() {
    return this.element.querySelector('.event__rollup-btn');
  }

  get favoriteBtn() {
    return this.element.querySelector('.event__favorite-btn');
  }

  get template() {
    return createNewPoint(this.#point);
  }

  #rollupClickHandler = (evt) => {
    evt.preventDefault();
    this.#rollupButtonHandler();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#favoriteButtonHandler();
  };
}
