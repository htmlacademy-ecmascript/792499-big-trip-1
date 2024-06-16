import Filters from './../view/filters.js';
import Sorting from './../view/sorting.js';
import NewForm from './../view/create-form.js';
import EditForm from './../view/edit-form.js';
import Point from './../view/point.js';
import {RenderPosition, render} from './../render.js';

export default class Presenter {

  constructor({mainContainer, filtersContainer, pointModels}) {
    this.mainContainer = mainContainer;
    this.filtersContainer = filtersContainer;
    this.pointModels = pointModels;
  }

  init() {
    this.presenterPoints = [...this.pointModels.getPoints()];

    render(new Filters(), this.filtersContainer, RenderPosition.BEFOREEND);
    render(new Sorting(), this.mainContainer, RenderPosition.BEFOREEND);
    render(new NewForm(), this.mainContainer, RenderPosition.BEFOREEND);
    render(new EditForm(), this.mainContainer, RenderPosition.BEFOREEND);

    for (let i = 0; i < this.presenterPoints.length; i++) {
      render(new Point({point: this.presenterPoints[i]}), this.mainContainer, RenderPosition.BEFOREEND);
    }
  }
}
