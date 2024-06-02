import Filters from './../view/filters.js';
import Sorting from './../view/sorting.js';
import NewForm from './../view/create-form.js';
import EditForm from './../view/edit-form.js';
import Point from './../view/point.js';
import {RenderPosition, render} from './../render.js';

export default class Presenter {

  init(filters, container) {
    render(new Filters(), filters, RenderPosition.BEFOREEND);
    render(new Sorting(), container, RenderPosition.BEFOREEND);
    render(new NewForm(), container, RenderPosition.BEFOREEND);
    render(new EditForm(), container, RenderPosition.BEFOREEND);

    for (let i = 0; i < 3; i++) {
      render(new Point(), container, RenderPosition.BEFOREEND);
    }
  }
}
