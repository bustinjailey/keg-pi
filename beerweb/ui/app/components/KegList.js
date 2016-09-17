import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {DropDownMenu} from 'material-ui/DropDownMenu';
import {RaisedButton, TextField, IconButton, MenuItem} from 'material-ui';
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
    onSaveButtonClick: React.PropTypes.func.isRequired,
    onToggleRowEdit: React.PropTypes.func.isRequired,
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
        <TableHeaderColumn>Remaining Volume (L)</TableHeaderColumn>
        <TableHeaderColumn>Capacity (L)</TableHeaderColumn>
        <TableHeaderColumn/>
      </TableRow>
    );

    let tableRows = [];
    this.addExistingKegRows(tableRows);
    this.addUnsavedKegRows(tableRows);

    let newKegs = this.props.kegs.newItems;
    let editedExistingKegs = this.props.kegs.items.filter(keg=>!!keg.isEdited);

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
        {newKegs.length > 0 || editedExistingKegs.length > 0
          ? <RaisedButton label="Save" onMouseUp={() => this.props.onSaveButtonClick(newKegs, editedExistingKegs)}
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

    //if (keg.isEdited && keg.isEdited === true) {
    if (!isExistingKeg === true) {
      tableRows.push(this.getEditableRow(keg, isExistingKeg));
    } else {
      tableRows.push(this.getReadOnlyRow(keg, beerStyleName, breweryName, beerFullName, isExistingKeg));
    }
  }

  getBreweryOptionsMenu(selectedBreweryId, keg, isExistingKeg) {
    let menuItems = [];

    for (let brewery of this.props.breweries.items) {
      menuItems.push(<MenuItem value={brewery.brewery_id} key={brewery.brewery_id} primaryText={brewery.name}/>)
    }

    return (
      <DropDownMenu value={selectedBreweryId} onChange={
        (event, index, value) => {
          keg.brewery_id = value;
          this.props.onKegChanged(keg, isExistingKeg);
        }}>
        {menuItems}
      </DropDownMenu>
    );
  }

  getBeerStyleOptionsMenu(selectedBeerStyleId, keg, isExistingKeg) {
    let menuItems = [];

    for (let beerStyle of this.props.beerStyles) {
      console.log(beerStyle);
      menuItems.push(<MenuItem value={beerStyle.beer_style_id} key={beerStyle.beer_style_id} primaryText={beerStyle.name}/>)
    }

    return (
      <DropDownMenu value={selectedBeerStyleId} onChange={
        (event, index, value) => {
          keg.beer_style_id = value;
          this.props.onKegChanged(keg, isExistingKeg);
        }}>
        {menuItems}
      </DropDownMenu>
    );
  }


  getBeerNamesOptionsMenu(selectedBeerId, keg, isExistingKeg) {
    let menuItems = [];

    for (let beer of this.props.beers) {
      if(beer.brewery_id === keg.brewery_id){
        menuItems.push(<MenuItem value={beer.beer_id} key={beer.beer_id} primaryText={beer.name}/>)
      }
    }

    return (
      <DropDownMenu value={selectedBeerId} onChange={
        (event, index, value) => {
          keg.beer_id = value;
          this.props.onKegChanged(keg, isExistingKeg);
        }}>
        {menuItems}
      </DropDownMenu>
    );
  }

  getBeerStyleName(beerId){
    let beerStyleId;
    for (let beer of this.props.beers){
      if(beer.beer_id === beerId){
        beerStyleId = beer.beer_style_id;
        break;
      }
    }

    for (let beerStyle of this.props.beerStyles){
      if(beerStyle.beer_style_id === beerStyleId){
        return beerStyle.name;
      }
    }

    return "No match";
  }

  getReadOnlyRow(keg, beerStyleName, breweryName, beerFullName, isExistingKeg) {
    return (
      <TableRow key={keg.keg_id}>
        <TableRowColumn>{moment(keg.last_updated_timestamp).fromNow()}</TableRowColumn>
        <TableRowColumn>{breweryName}</TableRowColumn>
        <TableRowColumn>{beerFullName}</TableRowColumn>
        <TableRowColumn>{beerStyleName}</TableRowColumn>
        <TableRowColumn>{keg.current_volume}</TableRowColumn>
        <TableRowColumn>{keg.max_volume}</TableRowColumn>
        {this.getRowActionsColumn(keg, isExistingKeg)}
      </TableRow>
    );
  }

  getEditableRow(keg, isExistingKeg) {
    return (
      <TableRow key={keg.keg_id}>
        <TableRowColumn>{moment(keg.last_updated_timestamp).fromNow()}</TableRowColumn>
        <TableRowColumn>{this.getBreweryOptionsMenu(keg.brewery_id, keg, isExistingKeg)}</TableRowColumn>
        <TableRowColumn>{this.getBeerNamesOptionsMenu(keg.beer_id, keg, isExistingKeg)}</TableRowColumn>
        <TableRowColumn>{this.getBeerStyleName(keg.beer_id)}</TableRowColumn>
        <TableRowColumn>{this.getEditableCurrentVolumeTextField(keg, isExistingKeg)}</TableRowColumn>
        <TableRowColumn>{this.getEditableMaxVolumeTextField(keg, isExistingKeg)}</TableRowColumn>
        {this.getRowActionsColumn(keg, isExistingKeg)}
      </TableRow>
    );
  }

  getEditableCurrentVolumeTextField(keg, isExistingKeg) {
    return (<TextField hintText="current volume"
                       onChange={
                         (event, value) => {
                           keg.current_volume = value;
                           this.props.onKegChanged(keg, isExistingKeg);
                         }
                       }
                       value={`${keg.current_volume ? keg.current_volume: ""}`}/>);
  }

  getEditableMaxVolumeTextField(keg, isExistingKeg) {
    return (<TextField hintText="max volume"
                       onChange={
                         (event, value) => {
                           keg.max_volume = value;
                           this.props.onKegChanged(keg, isExistingKeg);
                         }
                       }
                       value={`${keg.max_volume ? keg.max_volume : ""}`}/>);
  }

  getRowActionsColumn(keg, isExistingKeg) {
    return (
      <TableRowColumn style={{textAlign: 'right'}}>
        <div>
          <IconButton iconClassName="material-icons"
                      onMouseUp={()=> {
                        this.props.onToggleRowEdit(keg.keg_id)
                      }}>
            mode_edit
          </IconButton>
          {!keg.is_active ?
            (<IconButton iconClassName="material-icons"
                         onMouseUp={()=> {
                           this.props.onDeleteKeg(keg.keg_id, isExistingKeg)
                         }}>
              delete_forever
            </IconButton>)
            : null
          }
      </div>
      </TableRowColumn>
    );
  }
}

