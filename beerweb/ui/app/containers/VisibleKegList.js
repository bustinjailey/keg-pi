import {connect} from 'react-redux'
import KegList from '../components/KegList'
import {fetchBreweriesIfNeeded, fetchBeersIfNeeded, fetchBeerStylesIfNeeded, fetchKegsIfNeeded} from '../actions';

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
    }
  }
};

const VisibleKegList = connect(mapStateToProps, mapDispatchToProps)(KegList);

export default VisibleKegList;