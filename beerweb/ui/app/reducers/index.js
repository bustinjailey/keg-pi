import {combineReducers} from 'redux'
import {breweries, breweryVisibilityFilter} from "./BreweriesReducer";
import {
  RECEIVE_BEERS,
  RECEIVE_BEER_STYLES,
  RECEIVE_KEGS
} from "../actions/index";

function beers(state = [], action) {
  switch (action.type) {
    case RECEIVE_BEERS:
      return action.beers;
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

const rootReducer = combineReducers({
  beers,
  breweries,
  kegs,
  beerStyles,
  breweryVisibilityFilter
});

export default rootReducer;