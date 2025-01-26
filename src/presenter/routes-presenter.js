import AbstractStatefulView from './../framework/view/abstract-view.js';
import {render, RenderPosition} from './../framework/render.js';
import Routes from './../view/routes.js';

export default class RoutesPresenter extends AbstractStatefulView {
  #mainContainer = null;
  #routes = null;
  #cities = null;

  constructor({mainContainer, cities}) {
    super();
    this.#cities = cities;
    this.#mainContainer = mainContainer;
  }

  createRoutes() {
    const routes = new Routes({cities: this.#cities});
    render(routes, this.#mainContainer, RenderPosition.BEFOREBEGIN);
  }

  init() {
    this.createRoutes();
  }
}
