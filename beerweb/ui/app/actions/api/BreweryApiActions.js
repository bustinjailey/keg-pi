import {shouldFetchArrayType} from './index';
import {
  POST_BREWERIES_SUCCESS,
  PUT_BREWERY_SUCCESS,
  GET_BREWERIES_SUCCESS,
  DELETE_BREWERY_SUCCESS
} from '../constants/ActionTypes';

import {
  ADD_BREWERY,
  UPDATE_BREWERY_NAME_LOCALLY
} from '../constants/ActionTypes';

function receiveBreweries(json) {
  return {
    type: GET_BREWERIES_SUCCESS,
    breweries: json
  }
}

function breweriesPostedSuccessfully() {
  return {
    type: POST_BREWERIES_SUCCESS
  };
}

function breweryPutSuccessfully(breweryId) {
  return {
    type: PUT_BREWERY_SUCCESS,
    breweryId
  };
}

function breweryDeletedSuccessfully(breweryId) {
  return {
    type: DELETE_BREWERY_SUCCESS,
    breweryId
  };
}

function fetchBreweries() {
  return dispatch => {
    return fetch('http://localhost:3001/breweries', {method: 'GET'})
      .then(response => response.json())
      .then(json => dispatch(receiveBreweries(json)));
  }
}

export function fetchBreweriesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchArrayType(getState().breweries.items)) {
      return dispatch(fetchBreweries());
    }
  }
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

export function putBrewery(brewery) {
  return (dispatch) => {
    return fetch(`http://localhost:3001/breweries/${brewery.brewery_id}`, {
      method: 'PUT',
      body: JSON.stringify(brewery),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(dispatch(breweryPutSuccessfully(brewery.brewery_id)));
  };
}

export function deleteBrewery(breweryId) {
  return (dispatch) => {
    return fetch(`http://localhost:3001/breweries/${breweryId}`, {
      method: 'DELETE'
    })
      .then(dispatch(breweryDeletedSuccessfully(breweryId)));
  };
}

export function addBrewery() {
  return {
    type: ADD_BREWERY
  }
}

export function updateBrewery(breweryId, name, isExistingBrewery) {
  return {
    type: UPDATE_BREWERY_NAME_LOCALLY,
    breweryId,
    name,
    isExistingBrewery
  }
}
