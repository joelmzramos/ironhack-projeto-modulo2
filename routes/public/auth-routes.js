const express = require('express');

const {
  getLogin,
  postLogin,
  getSignup,
  postSignup,
  getLogout,
} = require('../../controllers/auth-controller');

const router = express();

router.get('/login', getLogin);
router.post('/login', postLogin);
router.get('/signup', getSignup);
router.post('/signup', postSignup);
router.get('/logout', getLogout);

module.exports = router;
