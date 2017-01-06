import {
  GET_KEGS_SUCCESS,
  ADD_KEG,
  POST_KEG_SUCCESS,
  PAGE_UNMOUNTED,
  SET_KEG_AS_EDITED,
  UPDATE_KEG_LOCALLY,
  REMOVE_KEG_LOCALLY,
  PUT_KEG_SUCCESS,
  DELETE_KEG_SUCCESS
} from "../actions/constants/ActionTypes";


// The keg_id will be discarded by the DB in favor of the PK value when it is persisted
function getBlankKeg() {
  return {
    keg_id: "new" + Math.floor(Math.random() * (500)),
    max_volume: 19.8,
    current_volume: undefined,
    beer_id: undefined,
    is_active: false
  };
}

var removeKegFromState = function (state, action) {
  let newState = Object.assign({}, state);
  newState.items = state.items.filter(keg=>keg.keg_id !== action.kegId);
  return newState;
};


var removeUnsavedKegFromState = function (state, action) {
  let newState = Object.assign({}, state);
  newState.newItems = state.newItems.filter(keg=>keg.keg_id !== action.kegId);
  return newState;
};


var replaceStateKegs = function (state, action) {
  return Object.assign({}, state, {
    items: action.kegs
  });
};

var addSingleNewKegToState = function (state) {
  return Object.assign({}, state, {
    newItems: [...state.newItems, getBlankKeg()]
  });
};

var clearAnyUnsavedKegsFromState = function (state) {
  return Object.assign({}, state, {
    newItems: []
  });
};

var markKegAsEdited = function (state, action) {
  let stateCopy = Object.assign({}, state);
  let matchingKeg = stateCopy.items.find(item=>item.keg_id === action.rowId);

  if (matchingKeg === undefined) {
    //noinspection JSUnusedAssignment
    matchingKeg = stateCopy.newItems.find(item=>item.keg_id === action.rowId);
  }

  matchingKeg.isEdited = true;
  return stateCopy;
};

var clearKegsFromState = function (state) {
  return Object.assign({}, state, {
    items: [],
    newItems: []
  });
};

var updateKegInState = function (state, action) {
  let newState = Object.assign({}, state);
  let matchingKeg;

  if (action.isExistingKeg) {
    matchingKeg = newState.items.find(item=>item.keg_id === action.kegId);
    newState.hasEditedExistingKegs = true;
  } else {
    matchingKeg = newState.newItems.find(item=>item.keg_id === action.kegId);
  }

  //noinspection JSUnusedAssignment
  matchingKeg = action.updatedKeg;

  return newState;
};

export function kegs(state = {
  items: [],
  newItems: []
}, action) {
  switch (action.type) {
    case GET_KEGS_SUCCESS:
      return replaceStateKegs(state, action);
    case ADD_KEG:
      return addSingleNewKegToState(state);
    case PAGE_UNMOUNTED:
      return clearAnyUnsavedKegsFromState(state);
    case SET_KEG_AS_EDITED:
      return markKegAsEdited(state, action);
    case POST_KEG_SUCCESS:
      return clearKegsFromState(state);
    case UPDATE_KEG_LOCALLY:
      return updateKegInState(state, action);
    case PUT_KEG_SUCCESS:
      return clearKegsFromState(state);
    case DELETE_KEG_SUCCESS:
      return removeKegFromState(state, action);
    case REMOVE_KEG_LOCALLY:
      return removeUnsavedKegFromState(state, action);
    default:
      return state;
  }
}