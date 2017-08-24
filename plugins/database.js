//database.js
const Mongoose = require('mongoose');
const databaseUrl = 'localhost:27017';
const databaseOptions = {
  db: {
    native_parser: true,
    useMongoClient: true
  }
}

//load database
Mongoose.connect(databaseUrl, databaseOptions, function() {
});
const db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log('Connection with database succeeded.');
});
exports.db = db;
