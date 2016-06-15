import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import BreweryStore from "../stores/brewery-store";

export default class BreweryList extends React.Component {
  //noinspection JSMethodCanBeStatic
  componentWillMount() {
    if (BreweryStore.getBreweries() === undefined) {
      BreweryStore.setBreweries();
    }

    let breweries = BreweryStore.getBreweries();
    this.setState({breweries});
  }

  render() {
    let tableHeaderRow = (
      <TableRow>
        <TableHeaderColumn>Name</TableHeaderColumn>
        <TableHeaderColumn>Location</TableHeaderColumn>
      </TableRow>
    );

    let tableRows = [];
    this.state.breweries.forEach((brewery) => {
      tableRows.push(
        <TableRow key={brewery.brewery_id}>
          <TableRowColumn>{brewery.name}</TableRowColumn>
          <TableRowColumn>{brewery.brewery_id}</TableRowColumn>
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

