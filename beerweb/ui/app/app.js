import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import Navigation from './components/navigation';
import KegList from './components/keg-list';
import BreweryList from './components/brewery-list';
import BeerList from './components/beer-list';
import Paper from 'material-ui/Paper';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './styles/app.less'

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

ReactDOM.render((
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={KegList}/>
        <Route path="/kegs" component={KegList}/>
        <Route path="/breweries" component={BreweryList}/>
        <Route path="/beers" component={BeerList}/>
      </Route>
    </Router>),
  document.getElementById('contents')
);
