import {connect} from 'react-redux'
import BreweryList from '../components/BreweryList'
import {fetchBreweriesIfNeeded, addBrewery, updateBrewery} from '../actions';

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
    onAddBrewery: ()=> {
      dispatch(addBrewery())
    },
    onUpdateBrewery: (breweryId, name)=> {
      dispatch(updateBrewery(breweryId, name))
    },
    onSaveNewBreweries: ()=> {
      //dispatch(saveNewBreweries)
    }
  }
};

const VisibleBreweryList = connect(mapStateToProps, mapDispatchToProps)(BreweryList);

export default VisibleBreweryList;