import {combineReducers} from 'redux'
import {breweries} from "./Breweries";
import {kegs} from "./Kegs";
import {
  RECEIVE_BEERS,
  RECEIVE_BEER_STYLES
} from "../actions/index";

function beers(state = [], action) {
  switch (action.type) {
    case RECEIVE_BEERS:
      return action.beers;
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
  beerStyles
});

export default rootReducer;