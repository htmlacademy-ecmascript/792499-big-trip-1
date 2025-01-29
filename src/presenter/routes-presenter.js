import {render, remove, RenderPosition} from './../framework/render.js';
import Routes from './../view/routes.js';

export default class RoutesPresenter {
  #mainContainer = null;
  #routes = null;
  #cities = null;
  #points = null;

  constructor({mainContainer, points}) {
    this.#mainContainer = mainContainer;
    this.#points = points;
  }

  destroy() {
    if (this.#routes === null) {
      return;
    }

    remove(this.#routes);
    this.#routes = null;
  }

  createRoutes() {
    this.#routes = new Routes({
      points: this.#points,
    });

    render(this.#routes, this.#mainContainer, RenderPosition.BEFOREBEGIN);
  }

  init() {
    this.createRoutes();
  }
}
