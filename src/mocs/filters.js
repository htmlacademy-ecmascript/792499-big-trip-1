import {filters} from './../utils/filters-utils.js';

const generateFilters = (points) =>
  Object.entries(filters).map(([filterType, filterPoints]) => ({
    type: filterType,
    has: filterPoints(points).length > 0,
  }));

export {generateFilters};
