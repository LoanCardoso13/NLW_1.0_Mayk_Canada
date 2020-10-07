const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./src/database/database.db');

module.exports = db;

// let sql = `
// DELETE FROM places
// WHERE id=? ;
// `
// let id = 1;

// db.run(sql, id, function(err) {
//     if (err) {
//         return console.error(err.message);
//       }
//       console.log(`Row(s) deleted ${this.changes}`); 
//   });
