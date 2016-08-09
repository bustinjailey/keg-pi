import {connect} from 'react-redux'
import BeerList from '../components/BeerList'
import {fetchBreweriesIfNeeded, fetchBeersIfNeeded, fetchBeerStylesIfNeeded} from '../actions';


const mapStateToProps = (state) => {
  return {
    beers: state.beers,
    beerStyles: state.beerStyles,
    breweries: state.breweries
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onComponentMount: ()=> {
      dispatch(fetchBeersIfNeeded());
      dispatch(fetchBeerStylesIfNeeded());
      dispatch(fetchBreweriesIfNeeded());
    }
  }
};

const VisibleBeerList = connect(mapStateToProps, mapDispatchToProps)(BeerList);

export default VisibleBeerList;