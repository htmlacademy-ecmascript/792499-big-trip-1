const COUNT_POINTS = 3;

const TimeNames = {
  DAY: 'day',
  HOUR: 'hour',
  MINUTE: 'minute',
  ABBR_DAY: 'D',
  ABBR_HOUR: 'H',
  ABBR_MINUTE: 'M',

};

const TimeFormat = {
  DATE: 'DD MMM',
  DAY: 'DD',
  HOUR_MINUTE: 'HH:mm',
  HOUR: 'HH',
  MINUTE: 'mm',
  HOUR_IN_DAY: 24,
  MINUTE_IN_HOUR: 60,
  ZERO: '0',

};

const Offers = [
  {
    ID: 0,
    TITLE: 'Order Uber',
    PRICE: '20',
  },
  {
    ID: 1,
    TITLE: 'Add luggage',
    PRICE: '50',
  },
  {
    ID: 2,
    TITLE: 'Switch to comfort',
    PRICE: '80',
  },
  {
    ID: 3,
    TITLE: 'Rent a car',
    PRICE: '200',
  },
  {
    ID: 4,
    TITLE: 'Add breakfast',
    PRICE: '50',
  },
  {
    ID: 5,
    TITLE: 'Book tickets',
    PRICE: '40',
  },
  {
    ID: 6,
    TITLE: 'Lunch in city',
    PRICE: '30',
  },
  {
    ID: 7,
    TITLE: 'Add meal',
    PRICE: '15',
  },
  {
    ID: 8,
    TITLE: 'Choose seats',
    PRICE: '5',
  },
  {
    ID: 9,
    TITLE: 'Travel by train',
    PRICE: '40',
  },
];

export {TimeNames, TimeFormat, Offers, COUNT_POINTS};
