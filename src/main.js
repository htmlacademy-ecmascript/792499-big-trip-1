import {render} from './render.js';
import Presenter from './presenter/presenter.js';

const siteBody = document.querySelector('.page-body');
const siteFilters = siteBody.querySelector('.trip-controls__filters');
const mainContainer = siteBody.querySelector('.trip-events');
const pagePresenter = new Presenter();

pagePresenter.init(siteFilters, mainContainer);
