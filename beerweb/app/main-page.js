import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import injectTapEventPlugin from 'react-tap-event-plugin';


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

  constructor(props) {
    super(props);
    injectTapEventPlugin();
    this.state = {
      selectedDropDownMenuItem: 1
    };
  }

  changeDropDown = (event, index, value) => this.setState({selectedDropDownMenuItem: value});


  //noinspection JSMethodCanBeStatic
  getChildContext() {
    return {
      muiTheme: getMuiTheme()
    };
  }

  render() {
    return (
      <div className='content-wrapper'>
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <DropDownMenu value={this.state.selectedDropDownMenuItem} onChange={this.changeDropDown}>
              <MenuItem value={1} primaryText="Current Keg"/>
              <MenuItem value={2} primaryText="Past Kegs"/>
            </DropDownMenu>
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarTitle text={this.props.title}/>
            <ToolbarSeparator/>
            <RaisedButton label="Create a keg" primary={true}/>
          </ToolbarGroup>
        </Toolbar>
        <br/>
        <Paper style={this.style} zDepth={1}>

        </Paper>
      </div>
    )
  }
}
