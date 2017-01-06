import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {RaisedButton, TextField, IconButton} from 'material-ui';

export default class BreweryList extends React.Component {
  static propTypes = {
    breweries: React.PropTypes.object.isRequired,
    onComponentMount: React.PropTypes.func.isRequired,
    onComponentUpdate: React.PropTypes.func.isRequired,
    onAddRow: React.PropTypes.func.isRequired,
    onBreweryNameChanged: React.PropTypes.func.isRequired,
    onSaveNewBreweries: React.PropTypes.func.isRequired,
    onDeleteBrewery: React.PropTypes.func.isRequired,
    onComponentUnmount: React.PropTypes.func.isRequired,
    onToggleRowEdit: React.PropTypes.func.isRequired,
    onSaveEditedRow: React.PropTypes.func.isRequired
  };

  //noinspection JSMethodCanBeStatic
  componentDidMount() {
    this.props.onComponentMount();
  }

  componentWillUnmount() {
    this.props.onComponentUnmount();
  }

  componentWillUpdate() {
    this.props.onComponentUpdate();
  }

  render() {
    let tableHeaderRow = (
      <TableRow>
        <TableHeaderColumn>Name</TableHeaderColumn>
      </TableRow>
    );

    let tableRows = [];
    this.addExistingBreweryRows(tableRows);
    this.addNewlyAddedBreweryRows(tableRows);

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
          ? <RaisedButton label="Save" onMouseUp={() => this.props.onSaveNewBreweries(this.props.breweries.newItems)}
                          disabled={!this.props.breweries.isUserInputValid}
                          backgroundColor="#a4c639"
                          labelColor="#ffffff"/>
          : <RaisedButton label="Add Brewery" onMouseUp={this.props.onAddRow} primary={true}/>}
      </div>
    )
  }

  addExistingBreweryRows(tableRows) {
    this.props.breweries.items.forEach((brewery) => {
      tableRows.push(
        <TableRow key={brewery.brewery_id}>
          <TableRowColumn>{brewery.isEditable && brewery.isEditable === true
            ? <TextField hintText="Brewery name"
                         onChange={(event, value) => this.props.onBreweryNameChanged(brewery.brewery_id, value, true)}
                         onBlur={()=> this.props.onSaveEditedRow(brewery)}
                         value={brewery.name ? brewery.name : ""}/>
            : brewery.name}</TableRowColumn>
          <TableRowColumn style={{textAlign: 'right'}}>
            <IconButton iconClassName="material-icons" onMouseUp={()=>{this.props.onToggleRowEdit(brewery.brewery_id)}}>
              mode_edit
            </IconButton>
            <IconButton iconClassName="material-icons"
                        onMouseUp={()=>{this.props.onDeleteBrewery(brewery.brewery_id)}}>delete_forever</IconButton>
          </TableRowColumn>
        </TableRow>
      )
    });
  }

  addNewlyAddedBreweryRows(tableRows) {
    this.props.breweries.newItems.forEach((brewery) => {
      tableRows.push(
        <TableRow key={brewery.brewery_id}>
          <TableRowColumn>
            <TextField hintText="Brewery name"
                       onChange={(event, value) => this.props.onBreweryNameChanged(brewery.brewery_id, value, false)}
                       value={brewery.name ? brewery.name : ""}
            />
          </TableRowColumn>
        </TableRow>
      )
    });
  }
}

