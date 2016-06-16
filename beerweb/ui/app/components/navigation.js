import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Link, Router} from 'react-router';

export default class Navigation extends React.Component {
  static propTypes = {location: React.PropTypes.object};

  static childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
  };

  //noinspection JSMethodCanBeStatic
  getChildContext() {
    return {
      muiTheme: getMuiTheme()
    };
  }


  render() {
    return (
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <RaisedButton label="Kegs" containerElement={<Link to="/kegs" />}
                          primary={this.props.location.pathname === "/" || this.props.location.pathname === "/kegs"}/>
            <RaisedButton label="Breweries" containerElement={<Link to="/breweries" />}
                          primary={this.props.location.pathname==="/breweries"}/>
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarTitle text={this.props.title}/>
            <ToolbarSeparator/>
            <RaisedButton label="Create a keg" primary={true}/>
          </ToolbarGroup>
        </Toolbar>
    )
  }
}
