import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import moment from 'moment';

export default class KegList extends React.Component {
  static propTypes = {
    beers: React.PropTypes.object.isRequired,
    beerStyles: React.PropTypes.object.isRequired,
    breweries: React.PropTypes.object.isRequired,
    kegs: React.PropTypes.object.isRequired
  };

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
    this.props.kegs.forEach((keg) => {
      let thisBeer = this.props.beers.find(beer => beer.beer_id === keg.beer_id);
      let beerStyleName = this.props.beerStyles.find(style => style.beer_style_id === thisBeer.beer_style_id);
      let breweryName = this.props.breweries.find(brewery => brewery.brewery_id === thisBeer.brewery_id);

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

