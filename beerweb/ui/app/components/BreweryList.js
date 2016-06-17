import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

export default class BreweryList extends React.Component {
  static propTypes = {
    breweries: React.PropTypes.object.isRequired
  };

  render() {
    let tableHeaderRow = (
      <TableRow>
        <TableHeaderColumn>Name</TableHeaderColumn>
      </TableRow>
    );

    let tableRows = [];
    this.props.breweries.forEach((brewery) => {
      tableRows.push(
        <TableRow key={brewery.brewery_id}>
          <TableRowColumn>{brewery.name}</TableRowColumn>
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

