const express = require('express');
const passport = require('passport');
const {
  getLogin,
  postLogin,
  getSignup,
  postSignup,
} = require('../../controllers/auth-controller');

const routes = express();

routes.get('/login', getLogin);
// routes.post('/login', postLogin);
routes.post('/login',
  passport.authenticate('local', { successRedirect: '/home',
                                   failureRedirect: '/login',
                                   failureFlash: false })
);
routes.get('/signup', getSignup);
routes.post('/signup', postSignup);

module.exports = routes;
