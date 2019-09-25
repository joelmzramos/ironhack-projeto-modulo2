const express = require('express');
const {
  index,
  about,
  login,
  // message
} = require('../../controllers/public-controller');

const routes = express();

routes.get('/', index);
routes.get('/about', about);
routes.get('/login', login);
// routes.get('/message', message);

module.exports = routes;
