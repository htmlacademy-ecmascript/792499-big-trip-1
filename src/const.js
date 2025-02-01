const BasicValues = {
  TIME_STAMP: 10,
  ESCAPE_KEY: 27,
  CHECKED: 'checked',
  UNCHECKED: ' ',
  ZERO: 0,
  ONE: 1,
  TWO: 2,
  THREE: 3,
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const AUTHORIZATION = 'Basic iowue89w33r8r';
const END_POINT = 'https://20.objects.htmlacademy.pro/big-trip';

const EVENT_TYPES = ['taxi','bus','train','ship','drive','flight','check-in','sightseeing','restaurant',];

const TimeNames = {
  DAY: 'day',
  HOUR: 'hour',
  MINUTE: 'minute',
  SHORT_DAY: 'D',
  SHORT_HOUR: 'H',
  SHORT_MINUTE: 'M',
};

const TimeFormat = {
  ALL: 'YY/MM/DD HH:mm',
  DATE: 'DD MMM',
  DAY: 'DD',
  HOUR_MINUTE: 'HH:mm',
  HOUR: 'HH',
  MINUTE: 'mm',
  ONE_HOUR: 1,
  HOUR_IN_DAY: 24,
  MINUTE_IN_HOUR: 60,
  ZERO: '0',
  DATEPICKER: 'YYYY-MM-DDTHH:mm',
};

const FilterMessage = {
  EVERYTHING: 'Click New Event to create your first point',
  PAST: 'There are no past events now',
  PRESENT: 'There are no present events now',
  FUTURE: 'There are no future events now',
};

const FilterType = {
  EVERYTHING: 'everything',
  PAST: 'past',
  PRESENT: 'present',
  FUTURE: 'future',
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_TASK',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const NewPoint = {
  event: 'taxi',
  basePrice: '',
  isFavorite: false,
  destinations: {
    id: 1,
    description: '',
    name: '',
    pictures: [{src: 'https://loremflickr.com/248/152?random=1', description: 'Oslo'}],
  },
};

const TooltipLabel = {
  CITY: 'CITY',
  NUMBER: 'NUMBER',
  DATE: 'DATE',
};

const TooltipText = {
  CITY: 'Please, select a city from the suggested list',
  NUMBER: 'Please, enter a number',
  DATE: 'Please, enter a date',
};

export {BasicValues, EVENT_TYPES, TimeNames, TimeFormat, FilterType, FilterMessage, Mode, SortType, UserAction, UpdateType, NewPoint, TooltipText, TooltipLabel, Method, AUTHORIZATION, END_POINT, TimeLimit};
