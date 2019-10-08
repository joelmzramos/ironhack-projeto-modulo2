const express = require('express');
const router = express();
const uploadCloud = require('../../config/cloudinary.js');

const {
  getLogin,
  postLogin,
  getSignup,
  postSignup,
} = require('../../controllers/auth-controller');

router.get('/login', getLogin);
router.post('/login', postLogin);
router.get('/signup', getSignup);
router.post('/signup', uploadCloud.single("profilePicture"), postSignup);

module.exports = router;
