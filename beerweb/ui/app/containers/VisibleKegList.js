import {connect} from 'react-redux'
import KegList from '../components/KegList'
import {
  fetchBreweriesIfNeeded,
  fetchBeersIfNeeded,
  fetchBeerStylesIfNeeded,
  fetchKegsIfNeeded,
  postKegs,
  addKeg,
  pageUnmounted,
  setKegAsEditable,
  updateKeg,
  putKeg,
  deleteKeg
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
    onSaveNewKegs: (newKegs)=> {
      dispatch(postKegs(newKegs));
    },
    onToggleRowEdit: (kegId)=> {
      dispatch(setKegAsEditable(kegId));
    },
    onKegChanged: (updatedKeg, isExistingKeg)=> {
      dispatch(updateKeg(updatedKeg, isExistingKeg));
    },
    onSaveEditedRow: (keg)=> {
      dispatch(putKeg(keg));
    },
    onDeleteKeg: (kegId)=> {
      dispatch(deleteKeg(kegId));
    }
  }
};

const VisibleKegList = connect(mapStateToProps, mapDispatchToProps)(KegList);

export default VisibleKegList;