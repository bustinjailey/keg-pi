import EventEmitter from 'events';

var CHANGE_EVENT = 'keg-store-change';
var kegs = undefined;

class KegStore extends EventEmitter {

  constructor() {
    super();
    KegStore.setKegs();
  }

  static setKegs() {
    var getKegsRequest = new XMLHttpRequest();
    getKegsRequest.open("GET", "http://localhost:3001/kegs", false);
    getKegsRequest.send(null);
    kegs = JSON.parse(getKegsRequest.responseText);
  }

  static getKegs() {
    if (!kegs) {
      KegStore.setKegs();
    }
    return kegs;
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

KegStore.dispatchToken = null;

export default KegStore;