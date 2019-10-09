const express = require("express");
const router = express();

const {
  home,
  getEditUser,
  postEditUser,
  getEditPassword,
  postEditPassword,
  getCancelAccount,
  postCancelAccount,
  getService,
  newService,
  // createService,
  getLogout,
} = require('../../controllers/private-controller');

const checkRoles = role => (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === role) {
    return next();
  }
  return res.redirect('/login');
};

const checkSp = checkRoles('provider');
const ensureLogin = require("connect-ensure-login");
const uploadCloud = require('../../config/cloudinary.js');

const passwordMessage = (req, res) => {
  res.render('private/password-message');
};

router.get('/home', ensureLogin.ensureLoggedIn(), home);
// ROTAS DE EDIÇÃO COM PROBLEMAS=========================================================================='''''''''''''1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
router.get('/edit/user', ensureLogin.ensureLoggedIn(), getEditUser);
router.post('/edit-user', uploadCloud.single("profilePicture"), postEditUser);
router.get('/edit-password', ensureLogin.ensureLoggedIn(), getEditPassword);
router.post('/edit-password', postEditPassword);
router.get('/password-message', passwordMessage);
router.get('/cancel-account', ensureLogin.ensureLoggedIn(), getCancelAccount);
router.post('/cancel-account', postCancelAccount);

router.get('/service/:serviceId', getService);

// router.get('/service/:serviceId', checkSp, service);
router.get('/newservice', checkSp, newService);
// router.post('/createservice', checkSp, createService);
router.get('/logout', getLogout);

module.exports = router;





