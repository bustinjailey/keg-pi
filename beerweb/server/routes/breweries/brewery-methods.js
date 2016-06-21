var pgp = require('pg-promise')();

var connectionString = "postgres://postgres:raspberry@keg-pi.local/postgres";
var db = pgp(connectionString);

module.exports = {
  getBreweries: function () {
    // Returns a promise
    return db.query(`SELECT * FROM lu_brewery ORDER BY brewery_id`);
  },

  insertBreweries: function (breweries) {
    return db.tx(t=>t.batch(breweries.map(brewery=>t.one(
      `INSERT INTO lu_brewery (name)
       VALUES ($1) 
       RETURNING brewery_id`, [brewery.name]))))
  },

  deleteBrewery: function (breweryId) {
    return db.query(`DELETE FROM lu_brewery WHERE brewery_id = $1`, [breweryId]);
  },

  updateBrewery: function (breweryId, name) {
    return db.query(`UPDATE lu_brewery SET name = $2 WHERE brewery_id = $1`, [breweryId, name]);
  }
};