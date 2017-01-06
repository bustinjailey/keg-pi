import fetch from 'isomorphic-fetch'
import {shouldFetchArrayType, apiHost} from './index';
import {
  REQUEST_KEGS,
  GET_KEGS_SUCCESS,
  ADD_KEG,
  POST_KEG_SUCCESS,
  UPDATE_KEG_LOCALLY,
  DELETE_KEG_SUCCESS,
  REMOVE_KEG_LOCALLY
} from '../constants/ActionTypes';

function requestKegs() {
  return {
    type: REQUEST_KEGS
  }
}

function receiveKegs(json) {
  return {
    type: GET_KEGS_SUCCESS,
    kegs: json
  }
}

export function fetchKegs() {
  return dispatch => {
    dispatch(requestKegs());
    return fetch(`http://${apiHost}:3001/kegs`, {method: 'GET'})
      .then(response => response.json())
      .then(json => dispatch(receiveKegs(json)));
  }
}

function kegPostedSuccessfully() {
  return {
    type: POST_KEG_SUCCESS
  };
}

function kegDeletedSuccessfully(kegId) {
  return {
    type: DELETE_KEG_SUCCESS,
    kegId
  };
}

export function fetchKegsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchArrayType(getState().kegs.items)) {
      return dispatch(fetchKegs());
    }
  }
}

export function addKeg() {
  return {
    type: ADD_KEG
  }
}

export function removeUnsavedKeg(kegId) {
  return {
    type: REMOVE_KEG_LOCALLY,
    kegId
  }
}

export function postKegs(newKegs) {
  newKegs.forEach(keg => {
    if (!keg.current_volume) {
      keg.current_volume = keg.max_volume;
    }
  });

  return (dispatch) => {
    return fetch(`http://${apiHost}:3001/kegs`, {
      method: 'POST',
      body: JSON.stringify(newKegs),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(dispatch(kegPostedSuccessfully()));
  };
}

export function putKeg(updatedKeg) {
  return (dispatch) => {
    return fetch(`http://${apiHost}:3001/kegs/${updatedKeg.keg_id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedKeg),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(dispatch(kegPostedSuccessfully()));
  };
}

export function updateKeg(updatedKeg, isExistingKeg) {
  return {
    type: UPDATE_KEG_LOCALLY,
    updatedKeg,
    isExistingKeg
  };
}

export function deleteKeg(kegId) {
  return (dispatch) => {
    return fetch(`http://${apiHost}:3001/kegs/${kegId}`, {
      method: 'DELETE'
    })
      .then(dispatch(kegDeletedSuccessfully(kegId)));
  };
}