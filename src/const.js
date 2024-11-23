const BasicValues = {
  COUNT_POINTS: 3,
  TIME_STAMP: 10,
  ESCAPE_KEY: 27,
  CHECKED: 'checked',
  UNCHECKED: ' ',
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

const AUTHORIZATION = 'Basic iowue89w33r8r';
const END_POINT = 'https://20.objects.htmlacademy.pro/big-trip';

const OFFERS = [
  {
    id: 0,
    title: 'Order Uber',
    price: '20',
  },
  {
    id: 1,
    title: 'Add luggage',
    price: '50',
  },
  {
    id: 2,
    title: 'Switch to comfort',
    price: '80',
  },
  {
    id: 3,
    title: 'Rent a car',
    price: '200',
  },
  {
    id: 4,
    title: 'Add breakfast',
    price: '50',
  },
  {
    id: 5,
    title: 'Book tickets',
    price: '40',
  },
  {
    id: 6,
    title: 'Lunch in city',
    price: '30',
  },
  {
    id: 7,
    title: 'Add meal',
    price: '15',
  },
  {
    id: 8,
    title: 'Choose seats',
    price: '5',
  },
  {
    id: 9,
    title: 'Travel by train',
    price: '40',
  },
];

const EVENT_TYPES = ['taxi','bus','train','ship','drive','flight','check-in','sightseeing','restaurant',];
const CITIES = ['Milan', 'Basel', 'Praga'];
const DESTINATION_CITIES = [
  {
    id: 0,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.',
    name: CITIES[0],
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=1',
        description: 'Consectetur adipiscing elit.',
      },
      {
        src: 'https://loremflickr.com/248/152?random=2',
        description: 'Ipsum dolor sit amet.',
      },
    ]
  },
  {
    id: 1,
    description: 'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    name: CITIES[1],
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=3',
        description: 'Lectus varius viverra.',
      },
      {
        src: 'https://loremflickr.com/248/152?random=4',
        description: 'Nullam nunc ex.',
      },
    ]
  },
  {
    id: 2,
    description: 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.',
    name: CITIES[2],
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=5',
        description: 'Condimentum sed nibh vitae.',
      },
      {
        src: 'https://loremflickr.com/248/152?random=6',
        description: 'Purus ex euismod diam.',
      },
      {
        src: 'https://loremflickr.com/248/152?random=7',
        description: 'Purus ex euismod diam.',
      },
    ]
  },
];

const OFFER_TYPES = [
  {
    type: EVENT_TYPES[0],
    offers: [
      OFFERS[0],
    ],
  },
  {
    type: EVENT_TYPES[1],
    offers: [],
  },
  {
    type: EVENT_TYPES[2],
    offers: [],
  },
  {
    type: EVENT_TYPES[3],
    offers: [],
  },
  {
    type: EVENT_TYPES[4],
    offers: [
      OFFERS[3],
    ],
  },
  {
    type: EVENT_TYPES[5],
    offers: [
      OFFERS[1],
      OFFERS[2],
    ],
  },
  {
    type: EVENT_TYPES[6],
    offers: [
      OFFERS[4],
      OFFERS[1]
    ],
  },
  {
    type: EVENT_TYPES[7],
    offers: [
      OFFERS[5],
      OFFERS[6],
    ],
  },
  {
    type: EVENT_TYPES[8],
    offers: [],
  },
];

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

const POINTS = [
  {
    isFavorite: true,
    basePrice: 160,
    img: EVENT_TYPES[0],
    destination: DESTINATION_CITIES[0],
    event: EVENT_TYPES[0],
    offer: OFFER_TYPES[0],
    dateFrom: '2024-11-10T21:39',
    dateTo: '2024-11-18T21:44',
  },
  {
    isFavorite: false,
    img: EVENT_TYPES[4],
    basePrice: 600,
    destination: DESTINATION_CITIES[1],
    event: EVENT_TYPES[4],
    offer: OFFER_TYPES[4],
    dateFrom: '2024-08-11T08:11',
    dateTo: '2024-08-15T08:11',
  },
  {
    isFavorite: false,
    basePrice: 20,
    img: EVENT_TYPES[5],
    destination: DESTINATION_CITIES[2],
    event: EVENT_TYPES[5],
    offer: OFFER_TYPES[5],
    dateFrom: '2024-05-09T07:44',
    dateTo: '2024-05-09T18:44',
  },
];

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
};

const NewPoint = {
  event: 'taxi',
  img: 'taxi',
  basePrice: '',
  offer: {
    type: 'taxi',
    offers: [
      {
        id: 1,
        title: 'Order Uber',
        price: 20,
      },
    ],
  },
  isFavorite: false,
  destination: {
    id: 123,
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

export {BasicValues, OFFERS, EVENT_TYPES, CITIES, DESTINATION_CITIES, OFFER_TYPES, TimeNames, TimeFormat, POINTS, FilterType, FilterMessage, Mode, SortType, UserAction, UpdateType, NewPoint, TooltipText, TooltipLabel, Method, AUTHORIZATION, END_POINT};
