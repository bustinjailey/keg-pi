import {combineReducers} from 'redux'
import {VisibilityFilters, SET_BREWERY_VISIBILITY_FILTER} from '../actions'
import {RECEIVE_BREWERIES, RECEIVE_BEERS, RECEIVE_BEER_STYLES, RECEIVE_KEGS} from "../actions/index";

function beers(state = [], action) {
  switch (action.type) {
    case RECEIVE_BEERS:
      return action.beers;
    default:
      return state;
  }
}

function breweries(state = [], action) {
  switch (action.type) {
    case RECEIVE_BREWERIES:
      return action.breweries;
    default:
      return state;
  }
}

function kegs(state = [], action) {
  switch (action.type) {
    case RECEIVE_KEGS:
      return action.kegs;
    default:
      return state;
  }
}

function beerStyles(state = [], action) {
  switch (action.type) {
    case RECEIVE_BEER_STYLES:
      return action.beerStyles;
    default:
      return state;
  }
}

function breweryVisibilityFilter(state = VisibilityFilters.SHOW_ALL, action) {
  switch (action.type) {
    case SET_BREWERY_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state
  }
}

const rootReducer = combineReducers({
  beers,
  breweries,
  kegs,
  beerStyles,
  breweryVisibilityFilter
});

export default rootReducer;