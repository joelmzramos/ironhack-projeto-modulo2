const express = require('express');
const {
  authRoutes,
} = require('../../controllers/auth-routes');

const routes = express();

routes.get('/', authRoutes);

module.exports = routes;
