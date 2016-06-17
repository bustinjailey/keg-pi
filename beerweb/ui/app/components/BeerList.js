import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


export default class BeerList extends React.Component {
  static propTypes = {
    beers: React.PropTypes.object.isRequired,
    beerStyles: React.PropTypes.object.isRequired,
    breweries: React.PropTypes.object.isRequired
  };

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
    this.props.beers.forEach((beer) => {
      tableRows.push(
        <TableRow key={beer.beer_id}>
          <TableRowColumn>
            {this.props.breweries.find(brewery =>brewery.brewery_id === beer.brewery_id)}
          </TableRowColumn>
          <TableRowColumn>
            {beer.full_name}
          </TableRowColumn>
          <TableRowColumn>
            {this.props.beerStyles.find(style => style.beer_style_id === beer.beer_style_id)}
          </TableRowColumn>
          <TableRowColumn>
            {beer.name}
          </TableRowColumn>
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

