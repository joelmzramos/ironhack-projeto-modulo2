const express = require("express");
// const Users = require('../models/Users');
// const Services = require('../models/Services');


const {
  home,
  customer,
  detail,
  newService,
  createService,
} = require('../../controllers/private-controller');

const router = express();

const checkRoles = role => (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === role) {
    return next();
  }
  return res.redirect('/login');
};

const checkSp = checkRoles('service provider');
const ensureLogin = require("connect-ensure-login");

router.get('/home', checkSp, ensureLogin.ensureLoggedIn(), home);
router.get('/customer', checkSp, customer);
router.get('/detail/:serviceId', checkSp, detail);
router.get('/newservice', checkSp, newService);
router.post('/createservice', checkSp, createService);

module.exports = router;





