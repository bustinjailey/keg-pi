import fetch from 'isomorphic-fetch'
import {shouldFetchArrayType} from './index';
import {
  REQUEST_BEERS,
  RECEIVE_BEERS,
  REQUEST_BEER_STYLES,
  RECEIVE_BEER_STYLES
} from '../constants/ActionTypes';

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
