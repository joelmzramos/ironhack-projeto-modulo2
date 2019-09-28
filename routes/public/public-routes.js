const express = require('express');
const {
  index,
  about,
  login,
  // message
} = require('../../controllers/public-controller');

const router = express();

router.get('/', index);
router.get('/about', about);
router.get('/login', login);
// router.get('/message', message);

module.exports = router;
