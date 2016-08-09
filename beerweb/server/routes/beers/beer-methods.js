var pgp = require('pg-promise')();
var async = require('async');

var connectionString = "postgres://postgres:raspberry@keg-pi.local/postgres";
var db = pgp(connectionString);

module.exports = {
  getBeerById: function (beerId) {
    // Returns a promise
    return db.query(`SELECT * FROM lu_beer WHERE beer_id = ${beerId};`);
  },

  getAllBeers: function () {
    return db.query(`SELECT * FROM lu_beer`);
  }
};