import Filters from './../view/filters.js';
import Sorting from './../view/sorting.js';
import EditForm from './../view/edit-form.js';
import Point from './../view/point.js';
import createNoPoints from './../view/no-points.js';
import {render} from './../render.js';
import {isEscapeKey} from './../utils/common.js';
import {replace} from './../framework/render.js';
import {NoPointsFilter} from './../const.js';

export default class Presenter {
  #mainContainer = null;
  #filtersContainer = null;
  #pointModels = null;

  #presenterPoints = [];

  constructor({mainContainer, filtersContainer, pointModels}) {
    this.#mainContainer = mainContainer;
    this.#filtersContainer = filtersContainer;
    this.#pointModels = pointModels;
  }

  #renderBoard() {
    if (this.#presenterPoints.length === 0) {
      render(new createNoPoints(), this.#mainContainer);
    }

    render(new Filters({onTabClick: () => {
      const checkedBtn = this.#filtersContainer.querySelector('input[name=trip-filter]:checked');
      const eventsMessage = this.#mainContainer.querySelector('.trip-events__msg');

      if (eventsMessage) {
        const checkedBtnValue = checkedBtn.value.toUpperCase();
        eventsMessage.textContent = NoPointsFilter[checkedBtnValue];
      }
    }}), this.#filtersContainer);

    for (let i = 0; i < this.#presenterPoints.length; i++) {
      this.#renderElements(this.#presenterPoints[i]);
    }
  }

  init() {
    this.#presenterPoints = [...this.#pointModels.getPoints()];
    this.#renderBoard();
  }

  #renderElements(point) {
    const onDocumentKeydown = (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onDocumentKeydown);
      }
    };

    const currentPoint = new Point({point: point, onRollupClick: () => {
      replacePointToForm();
      document.addEventListener('keydown', onDocumentKeydown);
    }});

    const currentForm = new EditForm({point: point, onFormSubmit: () => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onDocumentKeydown);
    }});

    const sorting = new Sorting();

    function replacePointToForm() {
      replace(currentForm, currentPoint);
    }

    function replaceFormToPoint() {
      replace(currentPoint, currentForm);
    }

    render(currentPoint, this.#mainContainer);
  }
}
