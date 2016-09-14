import {
  PAGE_UNMOUNTED,
  SET_KEG_AS_EDITABLE,
  SET_BREWERY_AS_EDITABLE
} from './constants/ActionTypes';

import {PageNames} from "./constants/PageNames";


export function pageUnmounted(pageName) {
  return {
    type: PAGE_UNMOUNTED,
    pageName: pageName
  }
}

export function setKegAsEditable(rowId) {
  return {
    type: SET_KEG_AS_EDITABLE,
    pageName: PageNames.KEG_LIST,
    rowId: rowId
  }
}

export function setBreweryAsEditable(rowId) {
  return {
    type: SET_BREWERY_AS_EDITABLE,
    pageName: PageNames.BREWERY_LIST,
    rowId: rowId
  }
}

export * from './constants';
export * from './api';
