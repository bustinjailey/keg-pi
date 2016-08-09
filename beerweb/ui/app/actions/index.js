import {
  PAGE_UNMOUNTED,
  SET_ROW_AS_EDITABLE
} from './constants/ActionTypes';


export function pageUnmounted(pageName) {
  return {
    type: PAGE_UNMOUNTED,
    pageName: pageName
  }
}

export function setRowAsEditable(pageName, rowId) {
  return {
    type: SET_ROW_AS_EDITABLE,
    pageName: pageName,
    rowId: rowId
  }
}

export * from './constants';
export * from './api';
