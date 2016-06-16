import EventEmitter from 'events';

var CHANGE_EVENT = 'brewery-store-change';
var breweries = undefined;

class BreweryStore extends EventEmitter {

  static setBreweries() {
    var getBreweriesRequest = new XMLHttpRequest();
    getBreweriesRequest.open("GET", `http://localhost:3001/breweries`, false);
    getBreweriesRequest.send(null);
    console.log(`Got breweries: ${getBreweriesRequest.responseText}`);
    breweries = JSON.parse(getBreweriesRequest.responseText);
  }

  static getBreweries() {
    if (!breweries) {
      BreweryStore.setBreweries();
    }

    return breweries;
  }

  static getBreweryName(breweryId) {
    if (!breweries) {
      BreweryStore.setBreweries();
    }

    return breweries.find(brewery => brewery.brewery_id === breweryId).name;
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

BreweryStore.dispatchToken = null;

export default BreweryStore;