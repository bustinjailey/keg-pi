/*
 * action types
 */
export const SET_BREWERY_VISIBILITY_FILTER = 'SET_BREWERY_VISIBILITY_FILTER';

/*
 * other constants
 */
export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL'
};

/*
 * action creators
 */
export function setVisibilityFilter(filter) {
  return {type: SET_BREWERY_VISIBILITY_FILTER, filter}
}

// TODO: setBeers, setBreweries, setKegs