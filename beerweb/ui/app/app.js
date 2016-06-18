import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import Navigation from './components/navigation';
import VisibleKegList from './containers/VisibleKegList';
import VisibleBreweryList from './containers/VisibleBreweryList';
import VisibleBeerList from './containers/VisibleBeerList';
import rootReducer from './reducers';
import Paper from 'material-ui/Paper';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './styles/app.less';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import {Provider} from 'react-redux';

export default class App extends React.Component {
  static childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
  };

  static paperStyle = {
    textAlign: 'center',
    display: 'inline-block',
    paddingBottom: '25px'
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
        <Navigation location={this.props.location} title={this.props.title}/>
        <br/>
        <Paper style={App.paperStyle} zDepth={1}>
          {this.props.children}
        </Paper>
      </div>
    );
  }
}


const logger = createLogger();
const store = applyMiddleware(thunk, logger)(createStore)(rootReducer);

ReactDOM.render((
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={VisibleKegList}/>
          <Route path="kegs" component={VisibleKegList}/>
          <Route path="breweries" component={VisibleBreweryList}/>
          <Route path="beers" component={VisibleBeerList}/>
        </Route>
      </Router>
    </Provider>),
  document.getElementById('contents')
);