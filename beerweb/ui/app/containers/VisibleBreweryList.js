import {connect} from 'react-redux'
import BreweryList from '../components/BreweryList'
import {fetchBreweriesIfNeeded, addBrewery, updateBrewery, pageUnmounted, postBreweries} from '../actions';
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
    onAddBrewery: ()=> {
      dispatch(addBrewery())
    },
    onUpdateBrewery: (breweryId, name)=> {
      dispatch(updateBrewery(breweryId, name))
    },
    onSaveNewBreweries: (newBreweries)=> {
      dispatch(postBreweries(newBreweries))
    },
    onComponentUnmount: ()=> {
      dispatch(pageUnmounted(PageNames.BREWERY_LIST))
    }
  }
};

const VisibleBreweryList = connect(mapStateToProps, mapDispatchToProps)(BreweryList);

export default VisibleBreweryList;