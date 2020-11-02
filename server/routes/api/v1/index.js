const express = require('express');
const passport = require('passport');
const authController = require('../../../controllers/auth.controller');
const userController = require('../../../controllers/user.controller');
const router = express.Router();

router.get('/auth/google', authController.getGoogleAuth);

router.get('/auth/google/callback', authController.googleCbUrl);

// router.post('/login', 
//   passport.authenticate('local', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('/');
//   }
// );

router.post('/create-user', userController.createUser);

router.post('/login', userController.loginUser);

router.get('/logout', userController.logout);

router.get('/me', userController.getCurrentUser);

module.exports =router;