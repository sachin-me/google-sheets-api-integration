const mongoose = require('mongoose');
const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/User');

module.exports = (passport) => {
  passport.use(new LocalStrategy(
    function (username, password, done) {
      console.log(username, 'name in passport modules');
      User.findOne({
        username: username
      }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false);
        }
        return done(null, user);
      })
    }
  ));

  // Passport Google Strategy

  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CB_URL
    },
    function (accessToken, refreshToken, profile, done) {

      User.findOne({email: profile.emails[0].value}, (err, user) => {
        console.log(profile, user);
        if (err) return done(err);
        if (!user) {
          console.log('No user present');
          var newUser = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            provider: 'google',
            google: {name: profile.displayName, photo: profile.photos[0].value}
          });
          newUser.save(function(err, user) {
            console.log(err, user, 'create user');
            return done(err, user);
          })
          
        }

        if (user) {
          if(user.provider && user.provider == profile.provider) {
            return done(err, user);
          }
          // Update user
          
          User.findByIdAndUpdate(user._id, {provider: profile.provider, google: {
            name: profile.displayName,
            photo: profile.photos[0].value
          }},
          {new: true}, (err, user) => {
            return done(err, user);
          })
        }
      })
    }));

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
}