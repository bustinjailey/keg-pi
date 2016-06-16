import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import BeerStore from "../stores/beer-store";
import BreweryStore from "../stores/brewery-store";


export default class BeerList extends React.Component {
  //noinspection JSMethodCanBeStatic
  componentWillMount() {
    if (BeerStore.getBeers() === undefined) {
      BeerStore.setBeers();
    }

    let beers = BeerStore.getBeers();
    this.setState({beers});
  }

  render() {
    let tableHeaderRow = (
      <TableRow>
        <TableHeaderColumn>Brewery</TableHeaderColumn>
        <TableHeaderColumn>Full name</TableHeaderColumn>
        <TableHeaderColumn>Style</TableHeaderColumn>
        <TableHeaderColumn>Display name</TableHeaderColumn>
      </TableRow>
    );

    let tableRows = [];
    this.state.beers.forEach((beer) => {
      tableRows.push(
        <TableRow key={beer.beer_id}>
          <TableRowColumn>{BreweryStore.getBreweryName(beer.brewery_id)}</TableRowColumn>
          <TableRowColumn>{beer.full_name}</TableRowColumn>
          <TableRowColumn>{BeerStore.getBeerStyleName(beer.beer_style_id)}</TableRowColumn>
          <TableRowColumn>{beer.name}</TableRowColumn>
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

