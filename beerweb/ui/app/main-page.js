import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
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

  getKegs() {
    var getKegsRequest = new XMLHttpRequest();
    getKegsRequest.open("GET", "http://localhost:3001/kegs", false);
    getKegsRequest.send(null);
    return getKegsRequest.responseText;
  }

  render() {
    console.log(this.getKegs());

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
              <TableRow>
                <TableHeaderColumn>ID</TableHeaderColumn>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Status</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableRowColumn>1</TableRowColumn>
                <TableRowColumn>John Smith</TableRowColumn>
                <TableRowColumn>Employed</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>2</TableRowColumn>
                <TableRowColumn>Randal White</TableRowColumn>
                <TableRowColumn>Unemployed</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>3</TableRowColumn>
                <TableRowColumn>Stephanie Sanders</TableRowColumn>
                <TableRowColumn>Employed</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>4</TableRowColumn>
                <TableRowColumn>Steve Brown</TableRowColumn>
                <TableRowColumn>Employed</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}
