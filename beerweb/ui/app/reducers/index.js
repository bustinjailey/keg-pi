import {combineReducers} from 'redux'
import {VisibilityFilters, SET_BREWERY_VISIBILITY_FILTER} from '../actions'
import {
  RECEIVE_BREWERIES,
  RECEIVE_BEERS,
  RECEIVE_BEER_STYLES,
  RECEIVE_KEGS,
  ADD_BREWERY,
  UPDATE_BREWERY,
  PAGE_UNMOUNTED
} from "../actions/index";

// The brewery_id will be discarded by the DB in favor of the PK value when it is persisted
function getEmptyBrewery() {
  return {
    brewery_id: "new" + Math.floor(Math.random() * (500)),
    name: undefined
  };
}

function beers(state = [], action) {
  switch (action.type) {
    case RECEIVE_BEERS:
      return action.beers;
    default:
      return state;
  }
}

function breweries(state = {
  items: [],
  newItems: [],
  isUiDirty: false,
  isUserInputValid: false,
}, action) {
  switch (action.type) {
    case RECEIVE_BREWERIES:
      return Object.assign({}, state, {
        items: action.breweries
      });
    case ADD_BREWERY:
      return Object.assign({}, state, {
        isUiDirty: true,
        newItems: [...state.newItems, getEmptyBrewery()]
      });
    case UPDATE_BREWERY:
      let newState = Object.assign({}, state);
      newState.newItems.find(item=>item.brewery_id === action.breweryId).name = action.name;
      newState.isUserInputValid = newState.newItems.every(item=>item.name !== undefined && item.name.length > 0);
      return newState;
    case PAGE_UNMOUNTED:
      return Object.assign({}, state, {
        newItems: [],
        isUiDirty: false
      });
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