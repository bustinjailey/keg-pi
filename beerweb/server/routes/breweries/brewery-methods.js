var pgp = require('pg-promise')();
var async = require('async');

var connectionString = "postgres://postgres:raspberry@keg-pi.local/postgres";
var db = pgp(connectionString);

module.exports = {
  getBreweries: function () {
    // Returns a promise
    return db.query(`SELECT * FROM lu_brewery`);
  },

  insertBreweries: function (breweries) {
    return db.tx(t=>t.batch(breweries.map(brewery=>t.one(
      `INSERT INTO lu_brewery (name)
       VALUES ($1) 
       RETURNING brewery_id`, [brewery.name]))))
  }
};