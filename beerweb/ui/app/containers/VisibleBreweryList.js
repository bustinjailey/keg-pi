import {connect} from 'react-redux'
import BreweryList from '../components/BreweryList'
import {fetchBreweriesIfNeeded} from '../actions';

const getVisibleBreweries = (breweries, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return breweries;
    /*
     If we wanted to filter...
     case 'SHOW_ACTIVE':
     return todos.filter(t => !t.completed)
     */
  }
};

const mapStateToProps = (state) => {
  return {
    breweries: getVisibleBreweries(state.breweries, state.breweryVisibilityFilter)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onComponentMount: ()=> {
      dispatch(fetchBreweriesIfNeeded());
    }
  }
};

const VisibleBreweryList = connect(mapStateToProps, mapDispatchToProps)(BreweryList);

export default VisibleBreweryList;