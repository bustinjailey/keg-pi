var pgp = require('pg-promise')();

var connectionString = "postgres://postgres:raspberry@keg-pi.local/postgres";
var db = pgp(connectionString);

module.exports = {
  getBeerById: function (beerId) {
    // Returns a promise
    return db.query(`SELECT beer_id,
                            name,
                            full_name,
                            brewery_id,
                            beer_style_id
                     FROM lu_beer 
                     WHERE beer_id = ${beerId};`);
  },

  getAllBeers: function () {
    return db.query(`SELECT beer_id,
                            name,
                            full_name,
                            brewery_id,
                            beer_style_id
                     FROM lu_beer`);
  },

  insertBeers: function (beers) {
    return db.tx(t=>t.batch(beers.map(beer=>t.one(
      `INSERT INTO lu_beer (name, full_name, brewery_id, beer_style_id)
       VALUES ($1, $2, $3, $4) 
       RETURNING beer_id`, [beer.name, beer.full_name, beer.brewery_id, beer.beer_style_id]))))
  }

};