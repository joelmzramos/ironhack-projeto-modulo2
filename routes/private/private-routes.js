const express = require("express");
// const Users = require('../models/Users');
// const Services = require('../models/Services');


const {
  home,
  // customer,
  getEditUser,
  postEditUser,
  service,
  newService,
  // createService,
  getLogout,
} = require('../../controllers/private-controller');

const router = express();

const checkRoles = role => (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === role) {
    return next();
  }
  return res.redirect('/login');
};

const checkSp = checkRoles('provider');
const ensureLogin = require("connect-ensure-login");

router.get('/home', ensureLogin.ensureLoggedIn(), home);
// ROTAS DE EDIÇÃO COM PROBLEMAS=========================================================================='''''''''''''1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
router.get('/edit/user', ensureLogin.ensureLoggedIn(), getEditUser);
router.post('/edit/user/:id', postEditUser);
router.get('/service/:serviceId', checkSp, service);
router.get('/newservice', checkSp, newService);
// router.post('/createservice', checkSp, createService);
router.get('/logout', getLogout);

module.exports = router;





