import {connect} from 'react-redux'
import KegList from '../components/KegList'
import {
  fetchBreweriesIfNeeded,
  fetchBeersIfNeeded,
  fetchBeerStylesIfNeeded,
  fetchKegsIfNeeded,
  fetchKegs,
  postKegs,
  addKeg,
  pageUnmounted,
  setKegAsEditable,
  updateKeg,
  putKeg,
  deleteKeg,
  removeUnsavedKeg
} from '../actions';
import {PageNames} from "../actions/constants/PageNames";

const mapStateToProps = (state) => {
  return {
    kegs: state.kegs, // No filter because right now there is no filtering on keg type
    beers: state.beers,
    breweries: state.breweries,
    beerStyles: state.beerStyles
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onComponentMount: () => {
      dispatch(fetchBeersIfNeeded());
      dispatch(fetchBeerStylesIfNeeded());
      dispatch(fetchBreweriesIfNeeded());
      dispatch(fetchKegsIfNeeded());
    },
    onComponentUpdate: ()=> {
      dispatch(fetchBeersIfNeeded());
      dispatch(fetchBeerStylesIfNeeded());
      dispatch(fetchBreweriesIfNeeded());
      dispatch(fetchKegsIfNeeded());
    },
    onComponentUnmount: ()=> {
      dispatch(pageUnmounted(PageNames.KEG_LIST))
    },
    onAddRow: ()=> {
      dispatch(addKeg());
    },
    onSaveButtonClick: (newKegs, editedExistingKegs)=> {
      dispatch(postKegs(newKegs)).then(()=>dispatch(fetchKegs()));
      // TODO: dispatch putKegs for updated kegs

    },
    onToggleRowEdit: (kegId)=> {
      dispatch(setKegAsEditable(kegId));
    },
    onKegChanged: (updatedKeg, isExistingKeg)=> {
      dispatch(updateKeg(updatedKeg, isExistingKeg));
    },
    onDeleteKeg: (kegId, isExistingKeg)=> {
      if(isExistingKeg){
        dispatch(deleteKeg(kegId, isExistingKeg));
      } else {
        dispatch(removeUnsavedKeg(kegId));
      }
    }
  }
};

const VisibleKegList = connect(mapStateToProps, mapDispatchToProps)(KegList);

export default VisibleKegList;