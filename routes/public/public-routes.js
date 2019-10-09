const express = require('express');
const {
  index,
  about,
  login,
  loginMessage,
  signupMessage
} = require('../../controllers/public-controller');

const router = express();

router.get('/', index);
router.get('/about', about);
router.get('/login', login);
router.get('/login-message', loginMessage);
router.get('/signup-message', signupMessage);
// router.get('/message', message);

module.exports = router;
