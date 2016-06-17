import {combineReducers} from 'redux'
import {VisibilityFilters, SET_BREWERY_VISIBILITY_FILTER} from '../actions'

function beers(state = {}, action) {
  return state;
}

function breweries(state = {}, action) {
  return state;
}

function kegs(state = {}, action) {
  return state;
}

function breweryVisibilityFilter(state = VisibilityFilters.SHOW_ALL, action) {
  switch (action.type) {
    case SET_BREWERY_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state
  }
}

const beerwebApp = combineReducers({
  beers,
  breweries,
  kegs,
  breweryVisibilityFilter
});

export default beerwebApp;