import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Link} from 'react-router';

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

  makeRaisedButton(label, targetRoute) {
    return (
      <RaisedButton label={label} containerElement={<Link to={targetRoute} />}
                    primary={this.props.location.pathname === targetRoute}
                    secondary={!this.props.primary}/>
    )
  }


  render() {
    return (
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            {this.makeRaisedButton("Kegs", "/kegs")}
            {this.makeRaisedButton("Breweries", "/breweries")}
            {this.makeRaisedButton("Beers", "/beers")}
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
