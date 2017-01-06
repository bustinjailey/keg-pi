var pgp = require('pg-promise')();

var connectionString = "postgres://postgres:raspberry@keg-pi.local/postgres";
var db = pgp(connectionString);

module.exports = {
  getBeerStyleById: function (beerStyleId) {
    // Returns a promise
    return db.query(`SELECT beer_style_id, name FROM lu_beer_style WHERE beer_style_id = ${beerStyleId};`);
  },

  getBeerStyles: function () {
    // Returns a promise
    return db.query(`SELECT beer_style_id, name FROM lu_beer_style`);
  },

  insertBeerStyles: function (beerStyles) {
    return db.tx(t=>t.batch(beerStyles.map(beerStyle=>t.one(
      `INSERT INTO lu_beer_style (name)
       VALUES ($1) 
       RETURNING beer_style_id`, [beerStyle.name]))))
  }
};