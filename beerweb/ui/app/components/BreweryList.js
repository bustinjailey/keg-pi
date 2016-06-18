import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {RaisedButton, TextField} from 'material-ui';

export default class BreweryList extends React.Component {
  static propTypes = {
    breweries: React.PropTypes.object.isRequired,
    onComponentMount: React.PropTypes.func.isRequired,
    onAddBrewery: React.PropTypes.func.isRequired,
    onUpdateBrewery: React.PropTypes.func.isRequired,
    onSaveNewBreweries: React.PropTypes.func.isRequired
  };

  //noinspection JSMethodCanBeStatic
  componentDidMount() {
    this.props.onComponentMount();
  }

  render() {
    let tableHeaderRow = (
      <TableRow>
        <TableHeaderColumn>Name</TableHeaderColumn>
      </TableRow>
    );

    let tableRows = [];
    this.props.breweries.items.forEach((brewery) => {
      tableRows.push(
        <TableRow key={brewery.brewery_id}>
          <TableRowColumn>{brewery.name}</TableRowColumn>
        </TableRow>
      )
    });

    this.props.breweries.newItems.forEach((brewery) => {
      tableRows.push(
        <TableRow key={brewery.brewery_id}>
          <TableRowColumn>
            <TextField hintText="Brewery name"
                       onChange={(event, value) => this.props.onUpdateBrewery(brewery.brewery_id, value)}
                       value={brewery.name ? brewery.name : ""}
            />
          </TableRowColumn>
        </TableRow>
      )
    });

    return (
      <div className='list-wrapper'>
        <Table selectable={false}>
          <TableHeader displaySelectAll={false}
                       adjustForCheckbox={false}>
            {tableHeaderRow}
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {tableRows}
          </TableBody>
        </Table>
        <br/>
        {this.props.breweries.isUiDirty
          ? <RaisedButton label="Save" onMouseUp={this.props.onSaveNewBreweries}/>
          : <RaisedButton label="Add Brewery" onMouseUp={this.props.onAddBrewery}/>}
      </div>
    )
  }
}

