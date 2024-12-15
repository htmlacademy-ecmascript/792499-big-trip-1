import Presenter from './presenter/presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointModel from './model/point-model.js';
import FiltersModel from './model/filters-model.js';
import PointApiService from './task-api-service.js';
import {AUTHORIZATION, END_POINT} from './const.js';

const siteBody = document.querySelector('.page-body');
const headerMain = siteBody.querySelector('.trip-main');
const siteFilters = siteBody.querySelector('.trip-controls__filters');
const siteContainer = siteBody.querySelector('.trip-events');
const newPointBtn = siteBody.querySelector('.trip-main__event-add-btn');

const pointModels = new PointModel({
  pointsApiService: new PointApiService(END_POINT, AUTHORIZATION)
});
const filtersModel = new FiltersModel();

const pagePresenter = new Presenter({
  mainContainer: siteContainer,
  pointModels,
  filtersModel,
  headerMain,
});

const filterPresenter = new FilterPresenter({
  filtersContainer: siteFilters,
  filtersModel: filtersModel,
  pointsModel: pointModels,
  presenter: pagePresenter,
});

newPointBtn.setAttribute('disabled', 'disabled');

pagePresenter.init();
filterPresenter.init();
pointModels.init().finally(() => newPointBtn.removeAttribute('disabled'));
