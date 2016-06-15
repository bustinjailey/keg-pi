var pgp = require('pg-promise')();
var async = require('async');

var connectionString = "postgres://postgres:raspberry@keg-pi.local/postgres";
var db = pgp(connectionString);

module.exports = {
  getBreweries: function () {
    // Returns a promise
    return db.query(`SELECT * FROM lu_brewery`);
  }
};