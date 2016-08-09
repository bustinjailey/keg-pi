import {connect} from 'react-redux'
import BreweryList from '../components/BreweryList'
import {
  fetchBreweriesIfNeeded,
  addBrewery,
  updateBrewery,
  pageUnmounted,
  postBreweries,
  putBrewery,
  setRowAsEditable,
  deleteBrewery
} from '../actions';
import {PageNames} from '../actions/constants'

const mapStateToProps = (state) => {
  return {
    breweries: state.breweries
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onComponentMount: ()=> {
      dispatch(fetchBreweriesIfNeeded());
    },
    onComponentUpdate: ()=> {
      dispatch(fetchBreweriesIfNeeded());
    },
    onAddRow: ()=> {
      dispatch(addBrewery())
    },
    onBreweryNameChanged: (breweryId, name, isExistingBrewery)=> {
      dispatch(updateBrewery(breweryId, name, isExistingBrewery))
    },
    onSaveNewBreweries: (newBreweries)=> {
      dispatch(postBreweries(newBreweries))
    },
    onComponentUnmount: ()=> {
      dispatch(pageUnmounted(PageNames.BREWERY_LIST))
    },
    toggleRowEdit: (breweryId)=> {
      dispatch(setRowAsEditable(PageNames.BREWERY_LIST, breweryId))
    },
    onSaveEditedRow: (brewery)=> {
      dispatch(putBrewery(brewery));
    },
    onDeleteBrewery: (breweryId) => {
      dispatch(deleteBrewery(breweryId));
    }
  }
};

const VisibleBreweryList = connect(mapStateToProps, mapDispatchToProps)(BreweryList);

export default VisibleBreweryList;