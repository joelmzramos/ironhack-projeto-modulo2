const express = require('express');
const router = express();
const uploadCloud = require('../../config/cloudnary.js');

const {
  getLogin,
  postLogin,
  getSignup,
  postSignup,
  getLogout,
} = require('../../controllers/auth-controller');

router.get('/login', getLogin);
router.post('/login', postLogin);
router.get('/signup', getSignup);
router.post('/signup', uploadCloud.single("profilePicture"), postSignup);
router.get('/logout', getLogout);

module.exports = router;
