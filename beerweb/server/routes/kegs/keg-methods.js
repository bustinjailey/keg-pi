var pgp = require('pg-promise')();

var connectionString = "postgres://postgres:raspberry@keg-pi.local/postgres";
var db = pgp(connectionString);

module.exports = {
  getKegs: function () {
    // Returns a promise
    return db.query(`SELECT keg_id, 
                            max_volume, 
                            current_volume, 
                            beer_id, 
                            created_timestamp, 
                            last_updated_timestamp, 
                            is_active 
                     FROM keg;`);
  },

  insertKegs: function (kegs) {
    console.log(JSON.stringify(kegs));

    return db.tx(t=>t.batch(kegs.map(keg=>t.one(
      `INSERT INTO keg (max_volume, current_volume, beer_id, created_timestamp, last_updated_timestamp, is_active)
       VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, $4) 
       RETURNING keg_id`, [keg.max_volume, keg.current_volume, keg.beer_id, keg.is_active]
    ))));
  },

  updateKeg: function (keg_id, max_volume, beer_id, is_active) {
    console.log(keg_id, max_volume, beer_id, is_active);

    return db.query(`UPDATE keg 
                     SET max_volume = $2,
                         beer_id = $3,
                         is_active = $4
                     WHERE keg_id = $1`, [keg_id, max_volume, beer_id, is_active]);
  },

  deleteKeg: function (kegId) {
    return db.query(`DELETE FROM keg WHERE keg_id = $1`, [kegId]);
  },

  createNewKeg: function (keg){
    console.log('');
    console.log(JSON.stringify(keg));

    return db.query(
      `UPDATE keg SET is_active = false;

      INSERT INTO keg (max_volume, current_volume, beer_id, created_timestamp, last_updated_timestamp, is_active)
       VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, $4) 
       RETURNING keg_id`, [keg.max_volume, keg.current_volume, keg.beer_id, keg.is_active]);
  }
};