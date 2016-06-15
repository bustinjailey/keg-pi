import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import moment from 'moment';
import BeerStore from "../stores/beer-store";
import KegStore from "../stores/keg-store";

export default class KegList extends React.Component {
  //noinspection JSMethodCanBeStatic
  componentWillMount() {
    if (KegStore.getKegs() === undefined) {
      KegStore.setKegs();
    }

    let kegs = KegStore.getKegs();

    let allBeerIds = kegs.map((keg)=> {
      return keg.beer_id;
    });

    let beers = [];
    allBeerIds.forEach((beerId) => {
      if (!beers[beerId]) {
        if (BeerStore.getBeerById(beerId) === undefined) {
          BeerStore.setBeerById(beerId);
        }

        beers[beerId] = BeerStore.getBeerById(beerId);
      }
    });

    let allBeerStyleIds = beers.map((beer)=> {
      return beer.beer_style_id;
    });

    let beerStyles = [];
    allBeerStyleIds.forEach((beerStyleId) => {
      if (!beerStyles[beerStyleId]) {
        if (BeerStore.getBeerStyleById(beerStyleId) === undefined) {
          BeerStore.setBeerStyleById(beerStyleId);
        }

        beerStyles[beerStyleId] = BeerStore.getBeerStyleById(beerStyleId);
      }
    });

    this.setState({kegs, beers, beerStyles});
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

