import fetch from 'isomorphic-fetch'
import {shouldFetchArrayType} from './index';
import {
  REQUEST_KEGS,
  RECEIVE_KEGS
} from '../constants/ActionTypes';

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

function fetchKegs() {
  return dispatch => {
    dispatch(requestKegs());
    return fetch('http://localhost:3001/kegs', {method: 'GET'})
      .then(response => response.json())
      .then(json => dispatch(receiveKegs(json)));
  }
}

export function fetchKegsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchArrayType(getState().kegs)) {
      return dispatch(fetchKegs());
    }
  }
}
