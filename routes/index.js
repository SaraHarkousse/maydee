var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  if (req.user) {
    res.render('index', { user : req.user });
  } else {
    res.redirect('/signin');
  }
});

router.get('/signup', function(req, res) {
    res.render('signup', { });
});

router.post('/signup', function(req, res) {
    Account.register(new Account({ email : req.body.email }), req.body.password, function(err, account) {
        if (err) {
            return res.render('signup', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/signin', function(req, res) {
    res.render('signin', { user : req.user });
});

router.post('/signin', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

module.exports = router;
