const express = require('express');
const {
  index,
} = require('../../controllers/index-controller');

const routes = express();

routes.get('/', index);

module.exports = routes;
