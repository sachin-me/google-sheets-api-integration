const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const services = require('../services');

module.exports = {
  createUser: (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.json({
        error: 'username and Password are mandatory.'
      })
    }

    User.findOne({ username: name }, (err, user) => {
      if (err) return res.json({
        error: 'Could not find the user'
      })
      if (!user) {
        const newUser = new User({
          username: name,
          password
        })
        newUser.save((err, createdUser) => {
          if (err) return res.json({
            error: 'failed to save user'
          })
          res.json({
            message: 'User successfully created'
          })
        })
      } else {
        return res.json({
          error: 'Already an user, please login' 
        })
      }
    })
  },

  loginUser: (req, res, next) => {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.json({
        error: 'username and Password are mandatory.'
      })
    }
    try {
      User.findOne({ username: name }, function (err, user) {
        if (err) return res.json({
          error: 'Could not login user'
        })
        if (!user) return res.json({
          error: 'No matching user found.'
        })
        if (!bcrypt.compareSync(password, user.password)) {
          return res.json({
            error: 'Password does not match.'
          })
        }

        const { username, _id } = user;
        const token = jwt.sign({
          _id
        }, 'secret');
        console.log(token, 'token', user, 'user');
        res.cookie(
          "username",
          username,
          {
            expires: new Date(Date.now() + 84000000),
            httpOnly: true,
          }
        );
  
        res.cookie("token", token, {
          expires: new Date(Date.now() + 84000000),
          httpOnly: true,
        });
        
        res.json({
          message: `${username}, Successfully logged in`,
          token,
          userInfo: {
            username,
            _id
          }
        })
      })
    } catch (error) {
      return res.json({
        error: 'Something went wrong.'
      })
    }
  },

  // get current login user
  getCurrentUser: async (req, res, next) => {
    const token = services.getToken(req, res);
    
    if (!!token) {
      const user = jwt.verify(token, 'secret');
      const { _id } = user;

      const currentUser = await User.findOne({ _id: _id }).select('-password');
      
      if (!currentUser) {
        return res.json({
          error: 'No User Found'
        })
      } else {
        return res.json({
          message: 'User found, Successfully',
          currentUser
        })
      }
    } else {
      return res.json({
        error: 'Token expired. Please login to continue'
      })
    }
    
  },

  // logout current user
  logout: async (req, res, next) => {
    
    res.clearCookie('token');
    res.clearCookie('username');
    return res.json({
      message: 'User is logged out. Please login to continue'
    })
  }
}