import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


export default class BeerList extends React.Component {
  static propTypes = {
    beers: React.PropTypes.array.isRequired,
    beerStyles: React.PropTypes.array.isRequired,
    breweries: React.PropTypes.object.isRequired,
    onComponentMount: React.PropTypes.func.isRequired
  };

  //noinspection JSMethodCanBeStatic
  componentDidMount() {
    this.props.onComponentMount();
  }

  render() {
    let isDataReady = true;
    if (this.props.breweries.items.length === 0 ||
        this.props.beers.length === 0 ||
        this.props.beerStyles.length === 0) {
      isDataReady = false;
    }

    let tableHeaderRow = (
      <TableRow>
        <TableHeaderColumn>Brewery</TableHeaderColumn>
        <TableHeaderColumn>Full name</TableHeaderColumn>
        <TableHeaderColumn>Style</TableHeaderColumn>
        <TableHeaderColumn>Display name</TableHeaderColumn>
      </TableRow>
    );

    let tableRows = [];
    if (isDataReady) {
      this.props.beers.forEach((beer) => {
        tableRows.push(
          <TableRow key={beer.beer_id}>
            <TableRowColumn>
              {this.props.breweries.items.find(brewery =>brewery.brewery_id === beer.brewery_id).name}
            </TableRowColumn>
            <TableRowColumn>
              {beer.full_name}
            </TableRowColumn>
            <TableRowColumn>
              {this.props.beerStyles.find(style => style.beer_style_id === beer.beer_style_id).name}
            </TableRowColumn>
            <TableRowColumn>
              {beer.name}
            </TableRowColumn>
          </TableRow>
        )
      });
    }

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

