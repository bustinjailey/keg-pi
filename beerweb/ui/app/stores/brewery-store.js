import EventEmitter from 'events';

var CHANGE_EVENT = 'brewery-store-change';
var breweries = undefined;

class BreweryStore extends EventEmitter {

  constructor() {
    super();
    BreweryStore.setBreweries();
  }

  static setBreweries() {
    var getBreweriesRequest = new XMLHttpRequest();
    getBreweriesRequest.open("GET", `http://localhost:3001/breweries`, false);
    getBreweriesRequest.send(null);
    breweries = JSON.parse(getBreweriesRequest.responseText);
  }

  static getBreweries() {
    return breweries;
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