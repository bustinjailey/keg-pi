import EventEmitter from 'events';

var CHANGE_EVENT = 'beer-store-change';
var beers = undefined;
var beerStyles = undefined;

class BeerStore extends EventEmitter {

  constructor() {
    super();
  }

  static setBeerById(beerId) {
    var getBeerNamesRequest = new XMLHttpRequest();
    getBeerNamesRequest.open("GET", `http://localhost:3001/beers/${beerId}`, false);
    getBeerNamesRequest.send(null);
    if (!beers) {
      beers = [];
    }

    beers[beerId] = JSON.parse(getBeerNamesRequest.responseText)[0];
  }

  static setBeerStyleById(beerStyleId) {
    var getBeerNamesRequest = new XMLHttpRequest();
    getBeerNamesRequest.open("GET", `http://localhost:3001/beerStyles/${beerStyleId}`, false);
    getBeerNamesRequest.send(null);
    if (!beerStyles) {
      beerStyles = [];
    }

    beerStyles[beerStyleId] = JSON.parse(getBeerNamesRequest.responseText)[0];
  }

  static getBeerById(beerId) {
    if (!beers) {
      return undefined;
    }
    return beers[beerId];
  }

  static getBeerStyleById(beerStyleId) {
    if (!beerStyles) {
      return undefined;
    }
    return beerStyles[beerStyleId];
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

BeerStore.dispatchToken = null;

export default BeerStore;