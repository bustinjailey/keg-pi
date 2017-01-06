import {
  GET_BREWERIES_SUCCESS,
  ADD_BREWERY,
  UPDATE_BREWERY_NAME_LOCALLY,
  PAGE_UNMOUNTED,
  SET_BREWERY_AS_EDITABLE,
  PUT_BREWERY_SUCCESS,
  DELETE_BREWERY_SUCCESS
} from "../actions/constants/ActionTypes";


// The brewery_id will be discarded by the DB in favor of the PK value when it is persisted
function getEmptyBrewery() {
  return {
    brewery_id: "new" + Math.floor(Math.random() * (500)),
    name: undefined
  };
}

var removeBreweryFromState = function (state, action) {
  let newState = Object.assign({}, state);
  newState.items = state.items.filter(brewery=>brewery.brewery_id !== action.breweryId);
  return newState;
};

var replaceStateBreweries = function (state, action) {
  return Object.assign({}, state, {
    items: action.breweries
  });
};
var addSingleNewBreweryToState = function (state) {
  return Object.assign({}, state, {
    isUiDirty: true,
    newItems: [...state.newItems, getEmptyBrewery()]
  });
};
var updateBreweryNameInState = function (state, action) {
  let newState = Object.assign({}, state);

  if (action.isExistingBrewery) {
    newState.items.find(item=>item.brewery_id === action.breweryId).name = action.name;
  } else {
    newState.newItems.find(item=>item.brewery_id === action.breweryId).name = action.name;
  }

  newState.isUserInputValid =
    newState.items.every(item=>item.name && item.name.length > 0) &&
    newState.newItems.every(item=>item.name && item.name.length > 0);

  return newState;
};
var clearAnyUnsavedBreweriesFromState = function (state) {
  return Object.assign({}, state, {
    newItems: [],
    isUiDirty: false
  });
};

var markBreweryAsEditable = function (state, action) {
  let stateCopy = Object.assign({}, state);
  stateCopy.items.find(item=>item.brewery_id === action.rowId).isEditable = true;
  return stateCopy;
};

var clearBreweriesFromState = function (state) {
  return Object.assign({}, state, {
    items: []
  });
};

export function breweries(state = {
  items: [],
  newItems: [],
  isUiDirty: false,
  isUserInputValid: false
}, action) {
  switch (action.type) {
    case GET_BREWERIES_SUCCESS:
      return replaceStateBreweries(state, action);
    case ADD_BREWERY:
      return addSingleNewBreweryToState(state);
    case UPDATE_BREWERY_NAME_LOCALLY:
      return updateBreweryNameInState(state, action);
    case PAGE_UNMOUNTED:
      return clearAnyUnsavedBreweriesFromState(state);
    case SET_BREWERY_AS_EDITABLE:
      return markBreweryAsEditable(state, action);
    case PUT_BREWERY_SUCCESS:
      // Clear out brewery state entirely, so list is refreshed from DB.
      return clearBreweriesFromState(state);
    case DELETE_BREWERY_SUCCESS:
      return removeBreweryFromState(state, action);
    default:
      return state;
  }
}
