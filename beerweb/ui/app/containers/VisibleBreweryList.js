import {connect} from 'react-redux'
import BreweryList from '../components/BreweryList'

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

const VisibleTodoList = connect(mapStateToProps)(BreweryList);

export default VisibleTodoList