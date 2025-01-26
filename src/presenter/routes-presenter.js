import AbstractStatefulView from './../framework/view/abstract-view.js';
import {render, RenderPosition} from './../framework/render.js';
import Routes from './../view/routes.js';

export default class RoutesPresenter extends AbstractStatefulView {
  #mainContainer = null;
  #routes = null;
  #cities = null;
  #points = null;

  constructor({mainContainer, cities, points}) {
    super();
    this.#mainContainer = mainContainer;
    this.#cities = cities;
    this.#points = points;
  }

  createRoutes() {
    this.#routes = new Routes({
      cities: this.#cities,
      points: this.#points,
    });

    render(this.#routes, this.#mainContainer, RenderPosition.BEFOREBEGIN);
  }

  init() {
    this.createRoutes();
  }
}
