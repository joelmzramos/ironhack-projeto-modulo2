const express = require('express');
const {
  home,
  detail,
  newService,
  createService,
} = require('../../controllers/private-controller');

const routes = express();

routes.get('/home', home);
routes.get('/detail/:serviceId', detail);
routes.get('/newservice', newService);
routes.post('/createservice', createService);

module.exports = routes;
