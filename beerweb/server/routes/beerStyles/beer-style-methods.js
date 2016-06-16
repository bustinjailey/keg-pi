var pgp = require('pg-promise')();
var async = require('async');

var connectionString = "postgres://postgres:raspberry@keg-pi.local/postgres";
var db = pgp(connectionString);

module.exports = {
  getBeerStyleById: function (beerStyleId) {
    // Returns a promise
    return db.query(`SELECT * FROM lu_beer_style WHERE beer_style_id = ${beerStyleId};`);
  },

  getBeerStyles: function () {
    // Returns a promise
    return db.query(`SELECT * FROM lu_beer_style`);
  }
};