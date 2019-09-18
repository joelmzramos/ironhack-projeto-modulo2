const express = require('express');

const {
  getLogin,
  postLogin,
  getSignup,
  postSignup,
} = require('../../controllers/auth-controller');

const routes = express();

routes.get('/login', getLogin);
// routes.post('/login', postLogin);
routes.post('/login', postLogin);
routes.get('/signup', getSignup);
routes.post('/signup', postSignup);

module.exports = routes;
