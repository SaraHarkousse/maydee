module.exports = function (app) {

  /*!
   * Module dependencies.
   */
  const mongoose = require('mongoose');
  const config = require('./config');
  const session = require('express-session');
  const MongoStore = require('connect-mongo')(session);

  mongoose.connect(config.db);

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error'));
  db.once('open', function callback() {
      console.log("Connection with database succeeded.");
  });
  
  // use sessions for tracking logins
  app.use(session({
    secret: 'juliesarastephanielindaformaydee',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db
    })
  }));
};
