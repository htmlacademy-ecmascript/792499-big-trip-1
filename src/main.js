import Presenter from './presenter/presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointModel from './model/point-model.js';

const siteBody = document.querySelector('.page-body');
const siteFilters = siteBody.querySelector('.trip-controls__filters');
const siteContainer = siteBody.querySelector('.trip-events');
const pointModels = new PointModel();
const pagePresenter = new Presenter({
  mainContainer: siteContainer,
  pointModels,
});

const filterPresenter = new FilterPresenter({
  mainContainer: siteContainer,
  filtersContainer: siteFilters,
  pointModels,
});

pagePresenter.init();
filterPresenter.init();
