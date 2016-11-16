import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import {Link} from 'react-router';

export default class Navigation extends React.Component {
  static propTypes = {
    location: React.PropTypes.object.isRequired,
    title: React.PropTypes.string.isRequired
  };

  static childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
  };

  //noinspection JSMethodCanBeStatic
  getChildContext() {
    return {
      muiTheme: getMuiTheme()
    };
  }

  makeRaisedNavButton(label, targetRoute, isLinkToIndexRoute) {
    let isActive = this.props.location.pathname === targetRoute;

    if (isLinkToIndexRoute) {
      isActive = isActive || this.props.location.pathname === "/"
    }

    return (
      <RaisedButton label={label} containerElement={<Link to={targetRoute} />}
                    primary={isActive}
                    secondary={!isActive}/>
    )
  }

  getEntityName() {
    let entityName;

    switch (this.props.location.pathname) {
      case "/kegs":
      case "/":
        entityName = "keg";
        break;
      case "/breweries":
        entityName = "brewery";
        break;
      case "/beers":
        entityName = "beer";
        break;
    }

    return entityName;
  }

  render() {
    return (
      <Toolbar>
        <ToolbarGroup firstChild={true}>
          {this.makeRaisedNavButton("Kegs", "/kegs", true)}
          {this.makeRaisedNavButton("Beers", "/beers")}
          {this.makeRaisedNavButton("Breweries", "/breweries")}
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarTitle text={this.props.title}/>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}
