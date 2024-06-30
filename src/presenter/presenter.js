import Filters from './../view/filters.js';
import Sorting from './../view/sorting.js';
/*import NewForm from './../view/create-form.js';*/
import EditForm from './../view/edit-form.js';
import Point from './../view/point.js';
import {RenderPosition, render} from './../render.js';
import {isEscapeKey} from './../utils.js';
import {replace} from './../framework/render.js';

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

  init() {
    this.presenterPoints = [...this.#pointModels.getPoints()];

    render(new Filters(), this.#filtersContainer, RenderPosition.BEFOREEND);
    render(new Sorting(), this.#mainContainer, RenderPosition.BEFOREEND);

    for (let i = 0; i < this.presenterPoints.length; i++) {
      this.#renderElements(this.presenterPoints[i]);
    }
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

    function replacePointToForm() {
      replace(currentForm, currentPoint);
    }

    function replaceFormToPoint() {
      replace(currentPoint, currentForm);
    }

    render(currentPoint, this.#mainContainer, RenderPosition.BEFOREEND);
  }
}
