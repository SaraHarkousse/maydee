/**
 * Module dependencies.
 */
const User = require('./user.controller')

module.exports = function (app, passport) {
  //signin
  app.get('/', function(req, res) {
    if (req.user) {
      res.render('index', { user : req.user });
    } else {
      res.redirect('/signin');
    }
  });

  app.get('/signin', function(req, res) {
      res.render('signin', { user : req.user });
  });

	app.post('/signin', passport.authenticate('local', {}), User.login);

  //signup
  app.get('/signup', function(req, res) {
      res.render('signup', { });
  });

	app.post('/signup', User.create);

  //signout
	app.get('/logout', User.logout);
  app.get('/', function(req, res){
    res.status(200).send("pong!");
  });
};
