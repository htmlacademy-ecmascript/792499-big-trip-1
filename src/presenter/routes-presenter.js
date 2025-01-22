import AbstractStatefulView from './../framework/view/abstract-view.js';
import {render, RenderPosition} from './../framework/render.js';
import Routes from './../view/routes.js';

export default class RoutesPresenter extends AbstractStatefulView {
  #mainContainer = null;
  #routes = new Routes();

  constructor({mainContainer}) {
    super();
    this.#mainContainer = mainContainer;
  }

  createRoutes() {
    render(this.#routes, this.#mainContainer, RenderPosition.BEFOREBEGIN);
  }

  init() {
    this.createRoutes();
  }
}
