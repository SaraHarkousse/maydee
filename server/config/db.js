/*!
 * Module dependencies.
 */

const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.db);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log("Connection with database succeeded.");
});

exports.db = db;
