import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {RaisedButton, TextField, IconButton} from 'material-ui';
import moment from 'moment';

export default class KegList extends React.Component {
  static propTypes = {
    beers: React.PropTypes.array.isRequired,
    beerStyles: React.PropTypes.array.isRequired,
    breweries: React.PropTypes.object.isRequired,
    kegs: React.PropTypes.object.isRequired,
    onComponentMount: React.PropTypes.func.isRequired,
    onComponentUpdate: React.PropTypes.func.isRequired,
    onComponentUnmount: React.PropTypes.func.isRequired,
    onAddRow: React.PropTypes.func.isRequired,
    onSaveNewKegs: React.PropTypes.func.isRequired,
    onToggleRowEdit: React.PropTypes.func.isRequired,
    onSaveEditedRow: React.PropTypes.func.isRequired,
    onKegChanged: React.PropTypes.func.isRequired,
    onDeleteKeg: React.PropTypes.func.isRequired
  };

  //noinspection JSMethodCanBeStatic
  componentDidMount() {
    this.props.onComponentMount();
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
        <TableHeaderColumn/>
      </TableRow>
    );

    let tableRows = [];
    this.addExistingKegRows(tableRows);
    this.addUnsavedKegRows(tableRows);

    return (
      <div className='list-wrapper'>
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            {tableHeaderRow}
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {tableRows}
          </TableBody>
        </Table>
        <br/>
        {this.props.kegs.isUiDirty
          ? <RaisedButton label="Save" onMouseUp={() => this.props.onSaveNewKegs(this.props.kegs.newItems)}
                          disabled={!this.props.kegs.isUserInputValid}
                          backgroundColor="#a4c639"
                          labelColor="#ffffff"/>
          : <RaisedButton label="Add Keg" onMouseUp={this.props.onAddRow} primary={true}/>}
      </div>
    )
  }

  addExistingKegRows(tableRows) {
    this.props.kegs.items.forEach((keg) => {
      this.pushKegRowToTable(keg, tableRows, true);
    });
  }

  addUnsavedKegRows(tableRows) {
    this.props.kegs.newItems.forEach((keg) => {
      this.pushKegRowToTable(keg, tableRows, false);
    });
  }

  pushKegRowToTable(keg, tableRows, isExistingKeg) {
    let thisBeer = this.props.beers.find(beer => beer.beer_id === keg.beer_id);

    let beerStyleName = undefined;
    let breweryName = undefined;
    let beerFullName = undefined;

    if (thisBeer) {
      beerStyleName = this.props.beerStyles.find(style => style.beer_style_id === thisBeer.beer_style_id).name;
      breweryName = this.props.breweries.items.find(brewery => brewery.brewery_id === thisBeer.brewery_id).name;
      beerFullName = thisBeer.full_name;
    } else {
      beerStyleName = "";
      breweryName = "";
      beerFullName = "";
    }

    if (keg.isEditable && keg.isEditable === true) {
      tableRows.push(this.getEditableRow(keg, beerStyleName, breweryName, beerFullName, isExistingKeg));
    } else {
      tableRows.push(this.getReadOnlyRow(keg, beerStyleName, breweryName, beerFullName, isExistingKeg));
    }
  }

  getEditableRow(keg, beerStyleName, breweryName, beerFullName, isExistingKeg) {
    return (
      <TableRow key={keg.keg_id}>
        <TableRowColumn>{moment(keg.last_updated_timestamp).fromNow()}</TableRowColumn>
        <TableRowColumn>{breweryName}</TableRowColumn>
        <TableRowColumn>{beerFullName}</TableRowColumn>
        <TableRowColumn>{beerStyleName}</TableRowColumn>
        <TableRowColumn>{keg.current_volume}L</TableRowColumn>
        <TableRowColumn>
          <TextField hintText="Max volume"
                     onChange={
                       (event, value) => {
                         keg.max_volume = value;
                         this.props.onKegChanged(keg, isExistingKeg);
                       }
                     }
                     onBlur={()=> {
                       if (isExistingKeg) {
                         this.props.onSaveEditedRow(keg);
                       }
                     }}
                     value={`${keg.max_volume ? keg.max_volume : 0}`}/>
        </TableRowColumn>
        {this.getRowActionsColumn(keg)}
      </TableRow>
    );
  }

  getReadOnlyRow(keg, beerStyleName, breweryName, beerFullName) {
    return (
      <TableRow key={keg.keg_id}>
        <TableRowColumn>{moment(keg.last_updated_timestamp).fromNow()}</TableRowColumn>
        <TableRowColumn>{breweryName}</TableRowColumn>
        <TableRowColumn>{beerFullName}</TableRowColumn>
        <TableRowColumn>{beerStyleName}</TableRowColumn>
        <TableRowColumn>{keg.current_volume}L</TableRowColumn>
        <TableRowColumn>{keg.max_volume}L</TableRowColumn>
        <TableRowColumn style={{textAlign: 'right'}}>
          {this.getRowActionsColumn(keg)}
        </TableRowColumn>
      </TableRow>
    );
  }

  getEditButton(keg) {
    return (<div>
        <IconButton iconClassName="material-icons" onMouseUp={()=> {
          this.props.onToggleRowEdit(keg.keg_id)
        }}>
          mode_edit
        </IconButton>
        <IconButton iconClassName="material-icons"
                    onMouseUp={()=> {
                      this.props.onDeleteKeg(keg.keg_id)
                    }}>delete_forever</IconButton>
      </div>
    );
  }

  getRowActionsColumn(keg) {
    return (
      <TableRowColumn style={{textAlign: 'right'}}>
        {this.getEditButton(keg)}
      </TableRowColumn>
    );
  }
}

