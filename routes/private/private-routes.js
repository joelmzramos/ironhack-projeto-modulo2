const express = require("express");
const {
  home,
  detail,
  newService,
  createService,
} = require('../../controllers/private-controller');

const routes = express();

const checkRoles = role => (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === role) {
    return next();
  }
  return res.redirect('/login');
};

const checkSp = checkRoles('service provider');

routes.get('/home', home);
routes.get('/detail/:serviceId', detail);
routes.get('/newservice', checkSp, newService);
routes.post('/createservice', checkSp, createService);

module.exports = routes;
