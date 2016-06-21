import fetch from 'isomorphic-fetch'
import {
  SET_BREWERY_VISIBILITY_FILTER,
  REQUEST_BREWERIES,
  ADD_BREWERY,
  UPDATE_BREWERY,
  PAGE_UNMOUNTED,
  USER_SAVE_ACTION,
  RECEIVE_BREWERIES,
  REQUEST_BEERS,
  RECEIVE_BEERS,
  REQUEST_BEER_STYLES,
  RECEIVE_BEER_STYLES,
  REQUEST_KEGS,
  RECEIVE_KEGS,
  POST_BREWERIES_SUCCESS

} from './constants/ActionTypes';


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

function requestBreweries() {
  return {
    type: REQUEST_BREWERIES
  }
}

function receiveBreweries(json) {
  return {
    type: RECEIVE_BREWERIES,
    breweries: json
  }
}


function requestBeers() {
  return {
    type: REQUEST_BEERS
  }
}

function receiveBeers(json) {
  return {
    type: RECEIVE_BEERS,
    beers: json
  }
}


function requestBeerStyles() {
  return {
    type: REQUEST_BEER_STYLES
  }
}

function receiveBeerStyles(json) {
  return {
    type: RECEIVE_BEER_STYLES,
    beerStyles: json
  }
}


function requestKegs() {
  return {
    type: REQUEST_KEGS
  }
}

function receiveKegs(json) {
  return {
    type: RECEIVE_KEGS,
    kegs: json
  }
}

function fetchBreweries() {
  return dispatch => {
    dispatch(requestBreweries());
    return fetch('http://localhost:3001/breweries', {method: 'GET'})
    .then(response => response.json())
    .then(json => dispatch(receiveBreweries(json)));
  }
}

function fetchBeers() {
  return dispatch => {
    dispatch(requestBeers());
    return fetch('http://localhost:3001/beers', {method: 'GET'})
    .then(response => response.json())
    .then(json => dispatch(receiveBeers(json)));
  }
}

function fetchBeerStyles() {
  return dispatch => {
    dispatch(requestBeerStyles());
    return fetch('http://localhost:3001/beerStyles', {method: 'GET'})
    .then(response => response.json())
    .then(json => dispatch(receiveBeerStyles(json)));
  }
}

function fetchKegs() {
  return dispatch => {
    dispatch(requestKegs());
    return fetch('http://localhost:3001/kegs', {method: 'GET'})
    .then(response => response.json())
    .then(json => dispatch(receiveKegs(json)));
  }
}

function shouldFetchArrayType(arrayFromState) {
  return !!(!arrayFromState || arrayFromState.length === 0);
}

export function fetchBreweriesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchArrayType(getState().breweries.items)) {
      return dispatch(fetchBreweries());
    }
  }
}

export function fetchBeersIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchArrayType(getState().beers)) {
      return dispatch(fetchBeers());
    }
  }
}

export function fetchBeerStylesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchArrayType(getState().beerStyles)) {
      return dispatch(fetchBeerStyles());
    }
  }
}

export function fetchKegsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchArrayType(getState().kegs)) {
      return dispatch(fetchKegs());
    }
  }
}

export function addBrewery() {
  return {
    type: ADD_BREWERY
  }
}

export function updateBrewery(breweryId, name) {
  return {
    type: UPDATE_BREWERY,
    breweryId,
    name
  }
}

function breweriesPostedSuccessfully() {
  return {
    type: POST_BREWERIES_SUCCESS
  };
}

export function postBreweries(breweries) {
  return (dispatch) => {
    return fetch('http://localhost:3001/breweries', {
      method: 'POST',
      body: JSON.stringify(breweries),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(dispatch(breweriesPostedSuccessfully()));
  };
}

export function pageUnmounted(pageName) {
  return {
    type: PAGE_UNMOUNTED,
    pageName: pageName
  }
}

export * from "./constants/ActionTypes";
