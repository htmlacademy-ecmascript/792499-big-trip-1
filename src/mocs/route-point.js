import {Offers} from './../const.js';
import {getRandomArrayElement} from './../utils.js';

const eventTypes = ['taxi','bus','train','ship','drive','flight','check-in','sightseeing','restaurant',];

const destinationCities = [
  {
    id: 0,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.',
    name: 'Milan',
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
    name: 'Basel',
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
    name: 'Praga',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=5',
        description: 'Condimentum sed nibh vitae.',
      },
      {
        src: 'https://loremflickr.com/248/152?random=6',
        description: 'Purus ex euismod diam.',
      },
    ]
  },
];

const offerTypes = [
  {
    type: eventTypes[0],
    offers: [
      Offers[0],
    ],
  },
  {
    type: eventTypes[4],
    offers: [
      Offers[3],
    ],
  },
  {
    type: eventTypes[5],
    offers: [
      Offers[1],
      Offers[2],
    ],
  },
  {
    type: eventTypes[6],
    offers: [
      Offers[4],
      Offers[1]
    ],
  },
  {
    type: eventTypes[7],
    offers: [
      Offers[5],
      Offers[6],
    ],
  },
];

const points = [
  {
    id: 0,
    isFavorite: true,
    basePrice: 160,
    img: eventTypes[0],
    destination: destinationCities[0],
    event: eventTypes[0],
    offer: offerTypes[0],
    dateFrom: '2024-07-10T21:39',
    dateTo: '2024-07-10T21:44',
  },
  {
    id: 1,
    isFavorite: false,
    img: eventTypes[4],
    basePrice: 600,
    destination: destinationCities[1],
    event: eventTypes[4],
    offer: offerTypes[1],
    dateFrom: '2024-08-11T08:11',
    dateTo: '2024-08-15T08:11',
  },
  {
    id: 2,
    isFavorite: false,
    basePrice: 20,
    img: eventTypes[5],
    destination: destinationCities[2],
    event: eventTypes[5],
    offer: offerTypes[2],
    dateFrom: '2024-09-09T07:44',
    dateTo: '2024-09-09T18:44',
  },
];

const getRandomPoint = () => getRandomArrayElement(points);

export {getRandomPoint};
