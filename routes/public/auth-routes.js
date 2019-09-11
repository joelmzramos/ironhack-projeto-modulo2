const express = require('express');
const {
  authRoutes,
} = require('../../controllers/auth-routes');

const routes = express();

routes.get('/signup', authRoutes);

module.exports = routes;
