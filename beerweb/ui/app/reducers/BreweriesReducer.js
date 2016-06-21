import {VisibilityFilters} from "../actions/index";
import {
  RECEIVE_BREWERIES,
  ADD_BREWERY,
  UPDATE_BREWERY_NAME_LOCALLY,
  PAGE_UNMOUNTED,
  SET_BREWERY_VISIBILITY_FILTER,
  SET_ROW_AS_EDITABLE,
  PUT_BREWERY_SUCCESS
} from "../actions/constants/ActionTypes";


// The brewery_id will be discarded by the DB in favor of the PK value when it is persisted
function getEmptyBrewery() {
  return {
    brewery_id: "new" + Math.floor(Math.random() * (500)),
    name: undefined
  };
}


export function breweries(state = {
  items: [],
  newItems: [],
  isUiDirty: false,
  isUserInputValid: false
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
    case UPDATE_BREWERY_NAME_LOCALLY:
      let newState = Object.assign({}, state);

      if (action.isExistingBrewery) {
        newState.items.find(item=>item.brewery_id === action.breweryId).name = action.name;
      }
      else {
        newState.newItems.find(item=>item.brewery_id === action.breweryId).name = action.name;
      }

      console.log(JSON.stringify(state));
      newState.isUserInputValid =
        newState.items.every(item=>item.name && item.name.length > 0) &&
        newState.newItems.every(item=>item.name && item.name.length > 0);

      return newState;
    case PAGE_UNMOUNTED:
      return Object.assign({}, state, {
        newItems: [],
        isUiDirty: false
      });
    case SET_ROW_AS_EDITABLE:
      let stateCopy = Object.assign({}, state);
      stateCopy.items.find(item=>item.brewery_id === action.rowId).isEditable = true;
      return stateCopy;
    case PUT_BREWERY_SUCCESS:
      // Clear out brewery state entirely, so list is refreshed from DB.
      return Object.assign({}, state, {
        items: []
      });
    default:
      return state;
  }
}

export function breweryVisibilityFilter(state = VisibilityFilters.SHOW_ALL, action) {
  switch (action.type) {
    case SET_BREWERY_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state
  }
}