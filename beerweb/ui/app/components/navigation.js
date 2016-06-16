import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Link} from 'react-router';

export default class Navigation extends React.Component {
  static propTypes = {
    location: React.PropTypes.object
  };

  static childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.state = {
      isPageInEditMode: false
    }
  }

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

  addButtonClickedHandler = () => {
    this.setState({
      isPageInEditMode: !this.state.isPageInEditMode
    });
    // TODO: Trigger action and stuff
  };

  render() {
    let addButtonLabel = this.state.isPageInEditMode ? "Save" : `Add a ${this.getEntityName()}`;
    let addButtonBackgroundColor = this.state.isPageInEditMode ? "#a4c639" : undefined;
    let addButtonLabelColor = this.state.isPageInEditMode ? "#FFFFFF" : undefined;

    return (
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            {this.makeRaisedNavButton("Kegs", "/kegs", true)}
            {this.makeRaisedNavButton("Breweries", "/breweries")}
            {this.makeRaisedNavButton("Beers", "/beers")}
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarTitle text={this.props.title}/>
            <ToolbarSeparator/>
            <RaisedButton label={addButtonLabel}
                          onMouseUp={this.addButtonClickedHandler}
                          backgroundColor={addButtonBackgroundColor}
                          labelColor={addButtonLabelColor}/>
          </ToolbarGroup>
        </Toolbar>
    )
  }
}
