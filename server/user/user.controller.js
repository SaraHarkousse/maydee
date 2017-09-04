/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const passport = require('passport');
const User = require('./user.model').User;
const Boom = require('boom');


/**
 * Create user
 */

exports.create = function (req, res) {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    err = "passwords don't match";
    res.render('error', { error : err});
    return next(err);
  }

  if ( req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

      var userData = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
      }

      User.create(userData, function (err, user) {
        if (err) {
          if(err.code === 11000){
            return res.json({data: "email already exist"});
          }
          return res.send(Boom.badImplementation(err));
        } else {
          passport.authenticate('local')(req, res, function () {
            res.redirect('/');
          });
        }
      });
    }
};

/**
 * Show login form
 */

exports.login = function (req, res) {
  if(req.user == "Unknown user"){
        return res.json({status:"Not Exist"});
    }
    else if(req.user == "Invalid password"){
        return res.json({status:"Invalid Username and Password"});
    }
    else{
      //return res.json(req.user);
      res.redirect('/');
    }
};

/**
 * Logout
 */

exports.logout = function (req, res) {
  req.logout();
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
  //return res.json(req.user);
};

/** authentication check. */
exports.authCallback = function (req, res) {
   return res.json(req.user);
};
