import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import injectTapEventPlugin from 'react-tap-event-plugin';
import KegList from './keg-list';
import BreweryList from './brewery-list';

export default class MainPage extends React.Component {
  static childContextTypes = {
    muiTheme: React.PropTypes.object
  };

  static defaultProps = {
    title: "Beerweb"
  };

  static style = {
    height: 100,
    width: 100,
    margin: 200,
    textAlign: 'center',
    display: 'inline-block'
  };

  static VIEW = {
    KEGS: 'Kegs',
    BREWERIES: 'Breweries'
  };

  constructor(props) {
    super(props);
    injectTapEventPlugin();
    this.state = {
      selectedView: MainPage.VIEW.KEGS
    };
  }


  //noinspection JSMethodCanBeStatic
  getChildContext() {
    return {
      muiTheme: getMuiTheme()
    };
  }

  isActive(view) {
    return view === this.state.selectedView;
  }

  clickKegs = () => this.setState({selectedView: MainPage.VIEW.KEGS});
  clickBreweries = () => this.setState({selectedView: MainPage.VIEW.BREWERIES});

  render() {
    let mainSectionContent;

    switch (this.state.selectedView) {
      case MainPage.VIEW.KEGS:
        mainSectionContent = <KegList/>;
        break;
      case MainPage.VIEW.BREWERIES:
        mainSectionContent = <BreweryList/>;
        break;
    }

    return (
      <div className='content-wrapper'>
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <RaisedButton label={MainPage.VIEW.KEGS} primary={this.isActive(MainPage.VIEW.KEGS)}
                          onMouseUp={this.clickKegs}/>
            <RaisedButton label={MainPage.VIEW.BREWERIES} primary={this.isActive(MainPage.VIEW.BREWERIES)}
                          onMouseUp={this.clickBreweries}/>
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarTitle text={this.props.title}/>
            <ToolbarSeparator/>
            <RaisedButton label="Create a keg" primary={true}/>
          </ToolbarGroup>
        </Toolbar>
        <br/>
        <Paper style={this.style} zDepth={1}>
          {mainSectionContent}
        </Paper>
      </div>
    )
  }
}
