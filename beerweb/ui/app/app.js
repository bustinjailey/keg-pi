import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import Navigation from './components/navigation';
import KegList from './components/KegList';
import BreweryList from './components/BreweryList';
import BeerList from './components/BeerList';
import rootReducer from './reducers';
import Paper from 'material-ui/Paper';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './styles/app.less'
import {createStore} from 'redux';
import {Provider} from 'react-redux'

export default class App extends React.Component {
  static childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
  };

  static paperStyle = {
    textAlign: 'center',
    display: 'inline-block'
  };

  static defaultProps = {
    title: "Beerweb"
  };

  constructor(props) {
    super(props);
    injectTapEventPlugin();
  }

  //noinspection JSMethodCanBeStatic
  getChildContext() {
    return {
      muiTheme: getMuiTheme()
    };
  }

  render() {
    return (
      <div className='content-wrapper'>
        <Navigation location={this.props.location}/>
        <br/>
        <Paper style={App.paperStyle} zDepth={1}>
          {this.props.children}
        </Paper>
      </div>
    );
  }
}


let store = createStore(rootReducer);

ReactDOM.render((
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={KegList}/>
          <Route path="kegs" component={KegList}/>
          <Route path="breweries" component={BreweryList}/>
          <Route path="beers" component={BeerList}/>
        </Route>
      </Router>
    </Provider>),
  document.getElementById('contents')
);
