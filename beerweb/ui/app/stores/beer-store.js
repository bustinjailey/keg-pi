import EventEmitter from 'events';

var CHANGE_EVENT = 'beer-store-change';
var beers = undefined;
var beerStyles = undefined;

class BeerStore extends EventEmitter {
  static setBeers() {
    var getBeerNamesRequest = new XMLHttpRequest();
    getBeerNamesRequest.open("GET", `http://localhost:3001/beers`, false);
    getBeerNamesRequest.send(null);

    beers = JSON.parse(getBeerNamesRequest.responseText);
  }

  static setBeerStyles() {
    var getBeerNamesRequest = new XMLHttpRequest();
    getBeerNamesRequest.open("GET", `http://localhost:3001/beerStyles`, false);
    getBeerNamesRequest.send(null);

    beerStyles = JSON.parse(getBeerNamesRequest.responseText);
  }

  static getBeers() {
    return beers;
  }

  static getBeer(beerId) {
    console.log(beers);
    return beers.find(beer=>beer.beer_id === beerId);
  }

  static  getBeerStyles() {
    return beerStyles;
  }

  static getBeerStyleName(beerStyleId) {
    return beerStyles.find(beerStyle=>beerStyle.beer_style_id === beerStyleId).name;
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