import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import injectTapEventPlugin from 'react-tap-event-plugin';
import moment from 'momentjs';

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

  static getKegs() {
    var getKegsRequest = new XMLHttpRequest();
    getKegsRequest.open("GET", "http://localhost:3001/kegs", false);
    getKegsRequest.send(null);
    return JSON.parse(getKegsRequest.responseText);
  }

  render() {
    let tableHeaderRow = (
      <TableRow>
        <TableHeaderColumn>Keg Number</TableHeaderColumn>
        <TableHeaderColumn>Full Capacity</TableHeaderColumn>
        <TableHeaderColumn>Current Volume</TableHeaderColumn>
        <TableHeaderColumn>Type of beer</TableHeaderColumn>
        <TableHeaderColumn>Created</TableHeaderColumn>
        <TableHeaderColumn>Last poured</TableHeaderColumn>
      </TableRow>
    );

    let tableRows = [];
    MainPage.getKegs().forEach((keg) => tableRows.push(
      <TableRow>
        <TableRowColumn>{keg.keg_id}</TableRowColumn>
        <TableRowColumn>{keg.max_volume}</TableRowColumn>
        <TableRowColumn>{keg.current_volume}</TableRowColumn>
        <TableRowColumn>{keg.beer_id}</TableRowColumn>
        <TableRowColumn>{moment(keg.created_timestamp).format()}</TableRowColumn>
        <TableRowColumn>{keg.last_updated_timestamp}</TableRowColumn>
      </TableRow>
    ));

    return (
      <div className='content-wrapper'>
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <DropDownMenu value={this.state.selectedDropDownMenuItem} onChange={this.changeDropDown}>
              <MenuItem value={1} primaryText="Current Keg"/>
              <MenuItem value={2} primaryText="All Kegs"/>
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
          <Table>
            <TableHeader>
              {tableHeaderRow}
            </TableHeader>
            <TableBody>
              {tableRows}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}
