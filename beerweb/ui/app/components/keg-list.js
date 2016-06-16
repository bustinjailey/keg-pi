import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import moment from 'moment';
import BeerStore from "../stores/beer-store";
import KegStore from "../stores/keg-store";
import BreweryStore from "../stores/brewery-store";

export default class KegList extends React.Component {
  //noinspection JSMethodCanBeStatic
  componentWillMount() {
    KegList.checkAndInitializeStores();

    let kegs = KegStore.getKegs();
    let beers = BeerStore.getBeers();
    let beerStyles = BeerStore.getBeerStyles();

    this.setState({kegs, beers, beerStyles});
  }

  static checkAndInitializeStores() {
    if (!KegStore.getKegs()) {
      KegStore.setKegs();
    }

    if (!BeerStore.getBeers()) {
      BeerStore.setBeers();
    }

    if (!BeerStore.getBeerStyles()) {
      BeerStore.setBeerStyles();
    }
  }

  render() {
    if (!this.state.kegs || !this.state.beers || !this.state.beerStyles) {
      return;
    }

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
      let thisBeer = BeerStore.getBeer(keg.beer_id);
      let beerStyleName = BeerStore.getBeerStyleName(thisBeer.beer_style_id);
      let breweryName = BreweryStore.getBreweryName(thisBeer.brewery_id);

      tableRows.push(
        <TableRow key={keg.keg_id}>
          <TableRowColumn>{moment(keg.last_updated_timestamp).fromNow()}</TableRowColumn>
          <TableRowColumn>{breweryName}</TableRowColumn>
          <TableRowColumn>{thisBeer.full_name}</TableRowColumn>
          <TableRowColumn>{beerStyleName}</TableRowColumn>
          <TableRowColumn>{keg.current_volume}L</TableRowColumn>
          <TableRowColumn>{keg.max_volume}L</TableRowColumn>
        </TableRow>
      )
    });

    return (
      <div className='list-wrapper'>
        <Table>
          <TableHeader>
            {tableHeaderRow}
          </TableHeader>
          <TableBody>
            {tableRows}
          </TableBody>
        </Table>
      </div>
    )
  }
}

