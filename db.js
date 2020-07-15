const low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');

db = low(adapter);

db.defaults({ users: [], books: [], transactions: [], session: []}).write();

module.exports = db;