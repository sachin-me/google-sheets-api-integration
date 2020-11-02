const passport = require('passport');

module.exports = {
  getGoogleAuth: (req, res) => {
    console.log('get google auth called');
    return passport.authenticate('google', { scope: ['profile', 'email'] });
  },

  googleCbUrl: (req, res) => {
    passport.authenticate('google', { failureRedirect: '/login' });
    // Successful authentication, redirect home.
    res.redirect('/');
  },
}