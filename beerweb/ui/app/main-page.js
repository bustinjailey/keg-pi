import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import injectTapEventPlugin from 'react-tap-event-plugin';
import moment from 'moment';

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
      selectedDropDownMenuItem: 2,
      kegs: [],
      beers: []
    };
  }

  changeDropDown = (event, index, value) => this.setState({selectedDropDownMenuItem: value});


  //noinspection JSMethodCanBeStatic
  getChildContext() {
    return {
      muiTheme: getMuiTheme()
    };
  }

  //noinspection JSMethodCanBeStatic
  componentWillMount() {
    let kegs = MainPage.getKegs();

    let allBeerIds = kegs.map((keg)=> {
      return keg.beer_id;
    });

    let beers = [];
    allBeerIds.forEach((beerId) => {
      if (!beers[beerId]) {
        beers[beerId] = MainPage.getBeerById(beerId);
      }
    });

    let allBeerStyleIds = beers.map((beer)=> {
      return beer.beer_style_id;
    });

    let beerStyles = [];
    allBeerStyleIds.forEach((beerStyleId) => {
      if (!beerStyles[beerStyleId]) {
        beerStyles[beerStyleId] = MainPage.getBeerStyleById(beerStyleId);
      }
    });

    this.setState({kegs, beers, beerStyles});
  }

  static getKegs() {
    var getKegsRequest = new XMLHttpRequest();
    getKegsRequest.open("GET", "http://localhost:3001/kegs", false);
    getKegsRequest.send(null);
    return JSON.parse(getKegsRequest.responseText);
  }

  static getBeerById(beerId) {
    var getBeerNamesRequest = new XMLHttpRequest();
    getBeerNamesRequest.open("GET", `http://localhost:3001/beers/${beerId}`, false);
    getBeerNamesRequest.send(null);
    return JSON.parse(getBeerNamesRequest.responseText)[0];
  }

  static getBeerStyleById(beerStyleId) {
    var getBeerNamesRequest = new XMLHttpRequest();
    getBeerNamesRequest.open("GET", `http://localhost:3001/beerStyles/${beerStyleId}`, false);
    getBeerNamesRequest.send(null);
    return JSON.parse(getBeerNamesRequest.responseText)[0];
  }

  render() {
    let tableHeaderRow = (
      <TableRow>
        <TableHeaderColumn>Last poured</TableHeaderColumn>
        <TableHeaderColumn>Brewery</TableHeaderColumn>
        <TableHeaderColumn>Beer</TableHeaderColumn>
        <TableHeaderColumn>Style</TableHeaderColumn>
        <TableHeaderColumn>Remaining Volume</TableHeaderColumn>
        <TableHeaderColumn>Capacity</TableHeaderColumn>
      </TableRow>
    );

    let tableRows = [];
    this.state.kegs.forEach((keg) => {
      let thisBeer = this.state.beers[keg.beer_id];
      let thisBeerStyle = this.state.beerStyles[thisBeer.beer_style_id];

      tableRows.push(
        <TableRow key={keg.keg_id}>
          <TableRowColumn>{moment(keg.last_updated_timestamp).fromNow()}</TableRowColumn>
          <TableRowColumn>Fake Brewery Name</TableRowColumn>
          <TableRowColumn>{thisBeer.full_name}</TableRowColumn>
          <TableRowColumn>{thisBeerStyle.name}</TableRowColumn>
          <TableRowColumn>{keg.current_volume}L</TableRowColumn>
          <TableRowColumn>{keg.max_volume}L</TableRowColumn>
      </TableRow>
      )
    });

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
